export var Status;
(function (Status) {
    Status[Status["manufactured"] = 1] = "manufactured";
    Status[Status["assembled"] = 2] = "assembled";
    Status[Status["shipped"] = 3] = "shipped";
    Status[Status["deployed"] = 4] = "deployed";
    Status[Status["detonated"] = 5] = "detonated"; //התפוצץ
})(Status || (Status = {}));
