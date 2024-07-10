"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGreeter(greet) {
    // const greet = "Ciao";
    if (greet === void 0) { greet = "Ciao"; }
    return function (name) { return "".concat(greet, " ").concat(name); };
}
var greet = getGreeter();
var bye = getGreeter("Bye bye");
console.log(greet("Mario"));
console.log(bye("Mario"));
function createAssertSecret() {
    var secret = "secret";
    return function (arg) {
        if (arg !== secret) {
            throw new Error("Wrong secret");
        }
    };
}
var assertSecret = createAssertSecret();
assertSecret("secret");
// createAssertSecret().secret -> error
var Secret = /** @class */ (function () {
    function Secret() {
        this.s = "secret";
        // #s in js2022
    }
    return Secret;
}());
function createAverager() {
    var sum = 0;
    var count = 0;
    return function (arg) {
        if (arg) {
            sum += arg;
            count++;
        }
        return count > 0 ? sum / count : 0;
    };
}
var avg = createAverager();
avg(1);
avg(2);
avg(3);
console.log("avg:", avg());
console.log("avg4", avg(4));
