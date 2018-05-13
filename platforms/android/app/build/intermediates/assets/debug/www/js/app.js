String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};



let app = {

    goalType: "not defined",
    groupType: "not defined",

    dataStore: [],
    populateDs: function(item) {
        this.dataStore.push(item);
    },
    surveyId: null,
    appStartTimeStamp: null,
    currentPageTimestamp: null,
    pageOrder: 1,
    prevPage: "index",
    timeTracker: function(curTimeStamp) {
        let floorTimeStamp = this.currentPageTimestamp;
        this.currentPageTimestamp = curTimeStamp;
        return moment.duration(moment(curTimeStamp).diff(moment(floorTimeStamp)))._milliseconds;
    },
    textAnalyticsEngine: function(inputTxt) {
        let backspaceCount = 0;
        let totalKeyPressCount = 0;
        let timeStartTyping = 0;
        let timeStopTyping = 0;
        let timeSpentInField = 0;
        let finalInputValue;
        let finalInputLength;
        let intelliWordChanges = [""];
        let intelliWordIndex = 0;
        let inputStream = "";

        inputTxt.change(function(e) {
            finalInputValue = inputTxt.val();
            finalInputLength = inputTxt.val().length;
            timeStopTyping = e.timeStamp;
            timeSpentInField = moment.duration(moment(timeStopTyping).diff(moment(timeStartTyping)));
            intelliWordChanges.shift();
            console.log(intelliWordChanges);
        }).keypress(function(e) {
            totalKeyPressCount++;
            if (e.keyCode != 8) {
                inputStream += e.key;
            }

            if (e.keyCode == 8) {
                backspaceCount++;
                if (inputTxt.val().length == 1) {
                    intelliWordIndex++;
                    intelliWordChanges[intelliWordIndex] = inputStream;
                    inputStream = "";
                }

            }
            if (inputTxt.val().length == 1) {
                timeStartTyping = e.timeStamp;
            }

        });


    },
    util: {
        getPageTitleFromUrl: function(absUrl) {
            let pageIdMatch = /\/(\w+)\./;
            return pageIdMatch.exec(absUrl)[1];
        }

    },

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        this.onDeviceReady();
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        if (app.surveyId == null) {
            $.mobile.changePage("survey_id.html", {
                role: "dialog"
            });
        }

        $(document).on('pageinit', 'div:jqmData(role="page")', function(event){

            if (app.surveyId == null) {
                $.mobile.changePage("login.html");
            }
        });

        $(document).on('pagebeforeshow', '#login', (e) => {
            app.surveyId = 123;
        });

        $(document).on('click', '[data-role="goal_type_selection"]', (e) => {

            let target = $(e.target);
            let anchor = target.closest('a');
            let goalType = anchor.attr('data-goal-type');
            if (!goalType) return;
            let params = {goalType: goalType};
            app.goalType = goalType;
            if (goalType) {
                $.mobile.changePage('goal_type_desc.html');
            }
        });

        $(document).on('pagebeforeshow', '#goal-type-desc', (e) => {
            let goalType = app.goalType;
            if (!goalType) { $.mobile.back(); return }

            let img = 'img/default-image.jpg';

            if (goalType === 'entrepreneurship') {
                img = 'img/icon-bulb.png';
            } else if (goalType === 'employability') {
                img = 'img/icon-briefcase.png';
            } else if (goalType === 'personal') {
                img = 'img/icon-heart.png';
            }

            $("#goal-img").attr('src', img);
            $("#goal-title").html(goalType.capitalize());
            $("#goal-type").html(goalType.capitalize());
        });

        $(document).on('pagebeforeshow', '#goal_amount_selection', (e) => {
            $(document).find('.select-amount-goal-type').html(app.goalType.capitalize());
        });

        $(document).on('click', '[data-role=a-group-selection]', (e) => {
            let element = $(e.target).closest('a');

            let group = element.attr('data-group');
            if (!group) return;
            app.groupType = group;
            $.mobile.changePage('goal_amount_selection_complete.html');
        });

        $(document).on('pagebeforeshow', '#goal_amount_selection_complete', (e) => {

            let goalType = app.goalType;
            let group = app.groupType;
            let amount = 0;

            let img = 'img/default-image.jpg';
            if (group === 'savvy') {
                img = 'img/icon-money-bag-smallest.png';
                amount = 500;
            } else if (group === 'power') {
                img = 'img/icon-money-bag-small.png';
                amount = 1000;
            } else if (group === 'super') {
                img = 'img/icon-money-bag-big.png';
                amount = 2000;
            } else if (group === 'champion') {
                img = 'img/icon-money-bag-biggest.png';
                amount = 2000;
            }
            $('#img-gasc').attr('src', img);
            $('#goal-gasc').html(goalType.capitalize());
            $('#group-gasc').html(group.capitalize());
            $("#gasc-amount").html(group === 'champion' ? `more than Naira  ${numberWithCommas(amount)}` : `Naira ${numberWithCommas(amount)}`);
        });

        $(document).on('pagebeforeshow', '#group-stats', (e) => {
            let goalType = app.goalType;
            let group = app.groupType;
            let amount = 0;

            let img = 'img/default-image.jpg';
            if (group === 'savvy') {
                img = 'img/icon-money-bag-smallest.png';
                amount = 500;
            } else if (group === 'power') {
                img = 'img/icon-money-bag-small.png';
                amount = 1000;
            } else if (group === 'super') {
                img = 'img/icon-money-bag-big.png';
                amount = 2000;
            } else if (group === 'champion') {
                img = 'img/icon-money-bag-biggest.png';
                amount = 2000;
            }
            $("#gs-goal").html(goalType.capitalize());
            $("#gs-group").html(group.capitalize());
        });

        app.appStartTimeStamp = app.getTimeStamp();
        app.currentPageTimestamp = app.appStartTimeStamp;

        document.addEventListener("pause", function() {
            app.save();
        }, false);

        $(window).on("pagecontainerload", function(event, data) {

            let pageAnalytics = {};

            pageAnalytics.timeStamp = app.getTimeStamp();
            pageAnalytics.timeSpent = app.timeTracker(event.timeStamp);

            let absUrl = data.absUrl;
            let thePreviousPage = app.prevPage;
            let currentPage = app.util.getPageTitleFromUrl(absUrl);
            pageAnalytics.previousPage = thePreviousPage;
            pageAnalytics.pageName = currentPage;

            pageAnalytics.pageOrder = app.pageOrder;
            app.pageOrder++;
            app.prevPage = currentPage;
            let inputTxt = $(data.page).find("input");
            let isInputPresent = inputTxt.length ? "yes" : "no";
            pageAnalytics.isInputPresent = isInputPresent;
            pageAnalytics.inputStats = null;

            let inputFieldAnalytics = null;

            if (inputTxt.length) {
                let backspaceCount = 0;
                let totalKeyPressCount = 0
                let timeStartTyping = 0;
                let timeStopTyping = 0;
                let timeSpentInField = 0;
                let finalInputValue;
                let finalInputLength;
                let intelliWordChanges = [""];
                let intelliWordIndex = 0;
                let inputStream = ""

                inputTxt.change(function(e) {
                    finalInputValue = inputTxt.val();
                    finalInputLength = inputTxt.val().length;
                    timeStopTyping = app.getTimeStamp();
                    timeSpentInField = moment.duration(moment(timeStopTyping).diff(moment(timeStartTyping)))._milliseconds;
                    intelliWordChanges.shift();
                    let inputStatistics = {
                        backspaceCount: backspaceCount,
                        totalKeyPressCount: totalKeyPressCount,
                        timeStartTyping: timeStartTyping,
                        timeStopTyping: timeStopTyping,
                        timeSpentInField: timeSpentInField,
                        finalInputValue: finalInputValue,
                        finalInputLength: finalInputLength,
                        intelliWordChanges: intelliWordChanges.toString(),
                        intelliWordIndex: intelliWordIndex

                    }
                    pageAnalytics.inputStats = inputStatistics;
                    app.populateDs(pageAnalytics);


                }).keyup(function(e) {
                    totalKeyPressCount++;
                    if (e.keyCode != 8 || e.keyCode != 46) {
                        inputStream += e.key;
                    }

                    if (e.keyCode == 8 || e.keyCode == 46) {
                        backspaceCount++;
                        if (inputTxt.val().length == 1) {
                            intelliWordIndex++;
                            intelliWordChanges[intelliWordIndex] = inputStream;
                            inputStream = "";
                        }

                    }
                    if (inputTxt.val().length == 1) {
                        timeStartTyping = app.getTimeStamp();
                    }

                }).focus(function(e) {
                    // console.log(e.timeStamp);
                });

            } else {
                app.populateDs(pageAnalytics);
            }



        });
        $(document).on("click", "#survey-complete", function() {

            app.save();

        });

        $(document).on("click", "#survey-id-submit", function() {

            let x = $("#survey-id").val();

            if (x !== "") {

                app.surveyId = x;
                $('[data-role=dialog]').dialog("close");

            }

        });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        let parentElement = document.getElementById(id);
        let listeningElement = parentElement.querySelector('.listening');
        let receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    getTimeStamp: function() {

        let date = new Date();

        return date.getTime();

    },

    save: function() {
        $.mobile.loading('show', {
            text: 'Saving',
            theme: 'z',
            textVisible: true
        });
        $.ajax({
            type: "POST",
            url: "http://ec2-54-173-205-147.compute-1.amazonaws.com/busara/busara.php",
            data: {
                analytics: app.dataStore,
                application: 'deepnested',
                user: "40004" + app.surveyId
            },
            dataType: "text",
            error: function() {
                //$('.ui-loader').hide();
                $.mobile.loading('hide');
                //TODO logic  to resend request
            },
            success: function(data) {
                //$('.ui-loader').hide();
                $.mobile.loading('hide');

            }
        });
    }
};

app.initialize();