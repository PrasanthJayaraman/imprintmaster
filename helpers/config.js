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

exports.details = [{
        "key": "Aterm",
        "value": "DSR"
    },
    {
        "key": "Bterm",
        "value": "Task"
    },
    {
        "key": "Cterm",
        "value": "Client"
    }
];



exports.meta = {
    "title": "Report Form",
    "name": "dsr",
    "fields": [{
            "value": [],
            "type": "textfield",
            "textSize": "25",
            "style": "singleline_name",
            "label": "Client Name",
            "validation": "true",
            "key": "client",
            "priority": 1
        },
        {
            "value": [],
            "type": "textfield",
            "textSize": "25",
            "style": "singleline",
            "validation": "true",
            "label": "Contact Person",
            "key": "person",
            "priority": 4
        },
        {
            "value": [],
            "type": "textfield",
            "textSize": "25",
            "style": "singleline_number_limit_10pts",
            "validation": "true",
            "label": "Contact Number",
            "key": "contact",
            "priority": 5
        },
        {
            "value": ["Aterm", "Bterm", "Cterm", "Dterm"],
            "type": "checkbox",
            "textSize": "25",
            "style": "",
            "validation": "true",
            "label": "Activity",
            "key": "sales",
            "priority": 2
        },
        {
            "value": ["Aterm", "Bterm", "Cterm"],
            "type": "checkbox",
            "textSize": "25",
            "style": "",
            "validation": "true",
            "label": "Lead Status",
            "key": "lead",
            "priority": 3
        },
        {
            "value": [],
            "type": "textfield",
            "textSize": "25",
            "style": "singleline",
            "label": "Remarks",
            "validation": "false",
            "key": "remarks",
            "priority": 8
        },
        {
            "value": [],
            "type": "date",
            "textSize": "25",
            "style": "singleline",
            "validation": "true",
            "label": "Next FollowUp",
            "key": "followup",
            "priority": 6
        },
        {
            "value": [],
            "type": "location",
            "textSize": "25",
            "style": "",
            "label": "Co-ordinates",
            "validation": "false",
            "key": "coordinates",
            "priority": 7
        },
        {
            "value": [],
            "type": "camera",
            "textSize": "25",
            "style": "",
            "label": "Photo",
            "validation": "false",
            "key": "photo",
            "priority": 9
        },
        {
            "value": [],
            "type": "signature",
            "textSize": "25",
            "style": "",
            "label": "Customer signature",
            "validation": "false",
            "key": "signature",
            "priority": 10
        }
    ]
}