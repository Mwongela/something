"use strict";

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var numberWithCommas = function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var app = {

    goalType: "not defined",
    groupType: "not defined",

    dataStore: [],
    populateDs: function populateDs(item) {
        this.dataStore.push(item);
    },
    surveyId: null,
    appStartTimeStamp: null,
    currentPageTimestamp: null,
    pageOrder: 1,
    prevPage: "index",
    timeTracker: function timeTracker(curTimeStamp) {
        var floorTimeStamp = this.currentPageTimestamp;
        this.currentPageTimestamp = curTimeStamp;
        return moment.duration(moment(curTimeStamp).diff(moment(floorTimeStamp)))._milliseconds;
    },
    textAnalyticsEngine: function textAnalyticsEngine(inputTxt) {
        var backspaceCount = 0;
        var totalKeyPressCount = 0;
        var timeStartTyping = 0;
        var timeStopTyping = 0;
        var timeSpentInField = 0;
        var finalInputValue = void 0;
        var finalInputLength = void 0;
        var intelliWordChanges = [""];
        var intelliWordIndex = 0;
        var inputStream = "";

        inputTxt.change(function (e) {
            finalInputValue = inputTxt.val();
            finalInputLength = inputTxt.val().length;
            timeStopTyping = Date.now();
            timeSpentInField = moment.duration(moment(timeStopTyping).diff(moment(timeStartTyping)));
            intelliWordChanges.shift();
        }).keypress(function (e) {
            totalKeyPressCount++;
            if (e.keyCode !== 8) {
                inputStream += e.key;
            }

            if (e.keyCode === 8) {
                backspaceCount++;
                if (inputTxt.val().length === 1) {
                    intelliWordIndex++;
                    intelliWordChanges[intelliWordIndex] = inputStream;
                    inputStream = "";
                }
            }
            if (inputTxt.val().length === 1) {
                timeStartTyping = Date.now();
            }
        });
    },
    util: {
        getPageTitleFromUrl: function getPageTitleFromUrl(absUrl) {
            var pageIdMatch = /\/(\w+)\./;
            return pageIdMatch.exec(absUrl)[1];
        }

    },

    // Application Constructor
    initialize: function initialize() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function bindEvents() {
        this.onDeviceReady();
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function onDeviceReady() {

        if (app.surveyId === null) {
            setTimeout(function() { $.mobile.changePage('login.html'); }, 100);
        }

        // $(document).on('pageinit', 'div:jqmData(role="page")', function (event) {
        //
        //     if (app.surveyId == null) {
        //         $.mobile.changePage("login.html");
        //     }
        // });

        $(document).on('click', '[data-role="goal_type_selection"]', function (e) {

            var target = $(e.target);
            var anchor = target.closest('a');
            var goalType = anchor.attr('data-goal-type');
            if (!goalType) return;
            var params = { goalType: goalType };
            app.goalType = goalType;
            if (goalType) {
                $.mobile.changePage('goal_type_desc.html');
            }
        });

        $(document).on('pagebeforeshow', '#goal-type-desc', function (e) {
            var goalType = app.goalType;
            if (!goalType) {
                $.mobile.back();return;
            }

            var img = 'img/default-image.jpg';

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

        $(document).on('pagebeforeshow', '#goal_amount_selection', function (e) {
            $(document).find('.select-amount-goal-type').html(app.goalType.capitalize());
        });

        $(document).on('click', '[data-role=a-group-selection]', function (e) {
            var element = $(e.target).closest('a');

            var group = element.attr('data-group');
            if (!group) return;
            app.groupType = group;
            $.mobile.changePage('goal_amount_selection_complete.html');
        });

        $(document).on('pagebeforeshow', '#goal_amount_selection_complete', function (e) {

            var goalType = app.goalType;
            var group = app.groupType;
            var amount = 0;

            var img = 'img/default-image.jpg';
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
            $("#gasc-amount").html(group === 'champion' ? "more than Naira  " + numberWithCommas(amount) : "Naira " + numberWithCommas(amount));
        });

        $(document).on('pagebeforeshow', '#group-stats', function (e) {
            var goalType = app.goalType;
            var group = app.groupType;
            var amount = 0;

            var img = 'img/default-image.jpg';
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
            $("#gs-img").attr('src', img);
            $("#gs-goal").html(goalType.capitalize());
            $("#gs-group").html(group.capitalize());
        });

        $(document).on('click', '#login-button', function(e) {
            e.preventDefault();
            var phoneNumber = $("#phone_number").val();
            if (!phoneNumber || !/\d+/.test(phoneNumber)) {
                window.alert("Invalid Phone Number. Please try again");
                return;
            }
            app.surveyId = phoneNumber;
            $.mobile.changePage('homepage.html');
        });

        app.appStartTimeStamp = app.getTimeStamp();
        app.currentPageTimestamp = app.appStartTimeStamp;

        document.addEventListener("pause", function () {
            app.save();
        }, false);

        $(document).on("pagecontainerload", function (event, data) {

            var pageAnalytics = {};

            pageAnalytics.timeStamp = app.getTimeStamp();
            pageAnalytics.timeSpent = app.timeTracker(Date.now());

            var absUrl = data.absUrl;
            var thePreviousPage = app.prevPage;
            var currentPage = app.util.getPageTitleFromUrl(absUrl);

            if (currentPage === 'goal_type_desc') currentPage = `${app.goalType}_${currentPage}`;
            else if (currentPage === 'goal_amount_selection') currentPage = `${app.goalType}_${currentPage}`;
            else if (currentPage === 'goal_amount_selection_complete') currentPage = `${app.groupType}_${app.goalType}_${currentPage}`;
            else if (currentPage === 'group_stats') currentPage = `${app.groupType}_${app.goalType}_${currentPage}`;

            console.log("Current Page", currentPage);

            pageAnalytics.previousPage = thePreviousPage;
            pageAnalytics.pageName = currentPage;

            pageAnalytics.pageOrder = app.pageOrder;
            app.pageOrder++;
            app.prevPage = currentPage;
            var inputTxt = $(data.page).find("input");
            var isInputPresent = inputTxt.length ? "yes" : "no";
            pageAnalytics.isInputPresent = isInputPresent;
            pageAnalytics.inputStats = null;

            var inputFieldAnalytics = null;

            if (inputTxt.length) {
                var backspaceCount = 0;
                var totalKeyPressCount = 0;
                var timeStartTyping = 0;
                var timeStopTyping = 0;
                var timeSpentInField = 0;
                var finalInputValue = void 0;
                var finalInputLength = void 0;
                var intelliWordChanges = [""];
                var intelliWordIndex = 0;
                var inputStream = "";

                inputTxt.change(function (e) {
                    var name = inputTxt.attr("name");
                    var type = inputTxt.attr('type');
                    finalInputValue = type === 'radio' ? $(`input[name=${name}]:checked`).val() : inputTxt.val();
                    finalInputLength = inputTxt.val().length;
                    timeStopTyping = app.getTimeStamp();
                    timeSpentInField = moment.duration(moment(timeStopTyping).diff(moment(timeStartTyping)))._milliseconds;
                    intelliWordChanges.shift();
                    var inputStatistics = {
                        backspaceCount: backspaceCount,
                        totalKeyPressCount: totalKeyPressCount,
                        timeStartTyping: timeStartTyping,
                        timeStopTyping: timeStopTyping,
                        timeSpentInField: timeSpentInField,
                        finalInputValue: finalInputValue,
                        finalInputLength: finalInputLength,
                        intelliWordChanges: intelliWordChanges.toString(),
                        intelliWordIndex: intelliWordIndex,
                        name: inputTxt.attr("name")

                    };
                    pageAnalytics.inputStats = inputStatistics;
                    app.populateDs(pageAnalytics);
                }).keyup(function (e) {
                    totalKeyPressCount++;
                    if (e.keyCode !== 8 || e.keyCode !== 46) {
                        inputStream += e.key;
                    }

                    if (e.keyCode === 8 || e.keyCode === 46) {
                        backspaceCount++;
                        if (inputTxt.val().length === 1) {
                            intelliWordIndex++;
                            intelliWordChanges[intelliWordIndex] = inputStream;
                            inputStream = "";
                        }
                    }
                    if (inputTxt.val().length === 1 && timeStartTyping !== 0) {
                        timeStartTyping = app.getTimeStamp();
                    }
                }).focus(function (e) {
                    // console.log(e.timeStamp);
                });
            } else {
                app.populateDs(pageAnalytics);
            }
        });
        $(document).on("click", "#survey-complete", function () {

            app.save();
        });

        $(document).on("click", "#survey-id-submit", function () {

            var x = $("#survey-id").val();

            if (x !== "") {

                app.surveyId = x;
                $('[data-role=dialog]').dialog("close");
            }
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function receivedEvent(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    getTimeStamp: function getTimeStamp() {

        return Date.now();
    },

    save: function save() {
        $.mobile.loading('show', {
            text: 'Saving',
            theme: 'z',
            textVisible: true
        });
        $.ajax({
            type: "POST",
            url: "http://localhost/nigeria_backend/busara.php",
            data: {
                analytics: app.dataStore,
                application: 'nigeria_project',
                user: app.surveyId
            },
            dataType: "text",
            error: function error() {
                //$('.ui-loader').hide();
                $.mobile.loading('hide');
                //TODO logic  to resend request
            },
            success: function success(data) {
                //$('.ui-loader').hide();
                $.mobile.loading('hide');
                window.alert(data)
            }
        });
    }
};

app.initialize();