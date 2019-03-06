exports.appList = [{
        "id": "dsr",
        "image": "https://image.ibb.co/kFOcvL/small-notes.png",
        "name": "Daily Sale Report ",
        "api": "https://imp-cli.herokuapp.com/api/v1/job/dsr",
        "type": ["employee", "leader", "manager"],
        "mobile": true,
        "title": "DSR"
    },
    {
        "id": "tracking",
        "image": "https://i.imgur.com/SqWn33s.png",
        "name": "Tracking Management",
        "api": "https://imp-cli.herokuapp.com/api/v1/tracking",
        "type": ["employee", "leader", "manager"],
        "mobile": true,
        "title": "My Prints"
    },
    {
        "id": "team",
        "image": "https://i.imgur.com/F1O9Nfv.png",
        "name": "Team Management",
        "api": "https://imp-cli.herokuapp.com/api/v1/job/team",
        "type": ["leader", "manager"],
        "mobile": true,
        "title": "My Team"
    },
    {
        "id": "task",
        "image": "https://i.imgur.com/bUrakg7.png",
        "name": "Task Management",
        "api": "https://imp-cli.herokuapp.com/api/v1/task",
        "type": ["employee", "leader", "manager"],
        "mobile": true,
        "title": "Task"
    },
    {
        "id": "attendance",
        "image": "https://i.imgur.com/RSoTFMG.png",
        "name": "Attendance Sheet",
        "api": "https://imp-cli.herokuapp.com/api/v1/job/attendance",
        "type": ["employee", "leader", "manager"],
        "mobile": true,
        "title": "Leave"
    },
    {
        "id": "analytics",
        "image": "https://i.imgur.com/w8KjELH.png",
        "name": "Protocol Analytics",
        "api": "https://imp-cli.herokuapp.com/api/v1/analytics",
        "type": ["employee", "leader", "manager"],
        "mobile": true,
        "title": "Analytics"
    },
    {

        "id": "client",
        "image": "https://i.imgur.com/VbDF3MZ.png",
        "name": "Client Management",
        "api": "https://imp-cli.herokuapp.com/api/v1/client",
        "type": ["employee", "leader", "manager"],
        "mobile": true,
        "title": "My Clients"
    },
    {
        "id": "calendar",
        "image": "https://i.imgur.com/tRiAwh8.png",
        "name": "My Calendar",
        "api": "https://imp-cli.herokuapp.com/api/v1/calendar",
        "type": ["manager"],
        "mobile": true,
        "title": "Calendar"
    },
    {
        "id": "profile",
        "image": "https://i.imgur.com/9EyKUy1.png",
        "name": "My Profile",
        "api": "https://imp-cli.herokuapp.com/api/v1/employee",
        "type": ["employee", "leader", "manager"],
        "mobile": true,
        "title": "My Profile"
    }
]

exports.leads = [{
        "key": "Aterm",
        "value": "Hot"
    },
    {
        "key": "Bterm",
        "value": "Warm"
    },
    {
        "key": "Cterm",
        "value": "Cold"
    }
];

exports.sales = [{
        "key": "Aterm",
        "value": "Introduction"
    },
    {
        "key": "Bterm",
        "value": "Proposal"
    },
    {
        "key": "Cterm",
        "value": "Followup"
    }
];

exports.products = [{
        "key": "Aterm",
        "value": "Smart Class"
    },
    {
        "key": "Bterm",
        "value": "Smart Board"
    },
    {
        "key": "Cterm",
        "value": "ERP"
    }
];