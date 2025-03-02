const hosts_local = {
    Wellness_Tracker: "http://localhost:8080"
};

const hosts_remote = {
    Wellness_Tracker: "httpsXXXXXXX" //Wait till we know what remote host were connecting to
};

const mode = 0;

function getHosts() {
    return (mode == 0) ? hosts_local : hosts_remote;
}

let authentication = {loggedIn: false, hosts:getHosts(), token: ""};