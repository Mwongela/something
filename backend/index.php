<!DOCTYPE html>
<html>
<head>
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script>
</head>
<body>
<div class="container" style="margin-top: 60px;">
    <div class="row">
        <div class="col s12">
            <div class="card-panel white">
                <p><a class="waves-effect waves-light btn"
                      href="http://localhost/nigeria_backend/busara.php?action=">Download All
                        Data</a>
                <div class="divider"></div>


                <div class="section">


                    <h5>Input Phone Number to Download Data</h5>
                    <form method="get"
                          action="http://localhost/nigeria_backend/busara.php">
                        <input type="hidden" name="action" value="all-data-for-respondent"/>
                        <div class="row">
                            <div class="input-field col s6">
                                <input placeholder="Phone Number" id="respondent_id" name="respodent_id" type="text"
                                       class="validate" required>
                                <label for="first_name">Phone Number</label>
                            </div>
                            <div class="input-field col s6">
                                <input type="submit" value="Download Data" class="waves-effect waves-light btn"/>
                            </div>
                        </div>

                    </form>


                </div>

            </div>


        </div>

    </div>
</div>
</body>
</html>