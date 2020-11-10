export const interval = {
    "type": "number",
    "default": 1
}

export const freq = {
    "type": "string",
    "enum": [
        "YEARLY",
        "MONTHLY",
        "WEEKLY",
        "DAILY",
//        "HOURLY",
//        "MINUTELY",
//        "SECONDLY"
    ],
    "enumNames": [
        "år",
        "måned",
        "uke",
        "dag",
//        "time",
//        "minutt",
//        "sekund"
    ],
    "default": "WEEKLY"
}

export const byDay = {
    "type": "array",
    "items": {
        "type": "string",
        "enum": [
            "MO",
            "TU",
            "WE",
            "TH",
            "FR",
            "SA",
            "SU"
        ],
        "enumNames": [
            "Mandag",
            "Tirsdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lørdag",
            "Søndag"
        ]
    },
    "uniqueItems": true
}

export const byMonth = {
    "type": "array",
    "items": {
        "enum": [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
        ],
        "enumNames": [
            "Januar",
            "Februar",
            "Mars",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Desember"
        ]
    },
    "uniqueItems": true
}

export const byMonthDay = {
    "type": "array",
    "items": {
        "enum": [
            1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            30, 31
        ],
    },
    "uniqueItems": true
}

export const bySetPos = {
    "type": "array",
    "items": {
        "enum": [
            1,
            2,
            3,
            4,
            -1
        ],
        "enumNames": [
            "Første",
            "Andre",
            "Tredje",
            "Fjerde",
            "Siste"
        ]
    },
    "uniqueItems": true
}

export const ends = {
    "type": "string",
    "enum": [
        false,
        "ON",
        "AFTER"
    ],
    "enumNames": [
        "Aldri",
        "On date",
        "After"
    ],
    "default": false,
}

export default {
    "type": "object",
    "properties": {
        "freq": freq,
        "interval": interval,
        "ends": ends
    },
    "dependencies": {
        "freq": {
            "oneOf": [
                {
                    "properties": {
                        "freq": {
                            "enum": ["YEARLY"]
                        },
                        "byMonthDay": byMonthDay,
                        "byMonth": byMonth,
                        "bySetPos": bySetPos,
                        "byDay": byDay
                    }
                },
                {
                    "properties": {
                        "freq": {
                            "enum": ["MONTHLY"]
                        },
                        "byMonthDay": byMonthDay,
                        "bySetPos": bySetPos,
                        "byDay": byDay
                    }
                },
                {
                    "properties": {
                        "freq": {
                            "enum": ["WEEKLY"]
                        },
                        "byDay": byDay
                    }
                },
                {
                    "properties": {
                        "freq": {
                            "enum": ["DAILY"]
                        }
                     }
                },
                {
                    "properties": {
                        "freq": {
                            "enum": ["HOURLY"]
                        },
                        "byDay": byDay
                    }
                },
                {
                    "properties": {
                        "freq": {
                            "enum": ["MINUTELY"]
                        },
                        "byDay": byDay
                    }
                }
            ]
        },
        "ends": {
            "oneOf": [
                {
                    "properties": {
                        "ends": {
                            "enum": ["ON"]
                        },
                        "until": {
                            "type": "string",
                            "format": "date"
                        }
                    }
                },
                {
                    "properties": {
                        "ends": {
                            "enum": ["AFTER"]
                        },
                        "count": {
                            "type": "number",
                            "default": 1
                        }
                    }
                }
            ]            
        }
    }    
}