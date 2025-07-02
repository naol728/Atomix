"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = createStore;
function createStore(initalstate) {
    var states = initalstate;
    var listeners = new Set();
    var subscribe = function (listener) {
        listeners.push(listener);
    };
    var notify = function () {
        listeners.forEach(function (listener) {
            console.log("some state is changed ", listener);
        });
    };
    var setState = function (newState) {
        states = newState;
        notify();
    };
    var getState = function () {
        return states;
    };
    return {
        subscribe: subscribe,
        notify: notify,
        setState: setState,
        getState: getState,
    };
}
var store = createStore({ name: "naol" });
store.setState({ name: "abebe" });
var states = store.getState();
console.log(states);
