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
        "årlig",
        "månedlig",
        "ukentlig",
        "daglig",
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
        "På dato",
        "Etter antall"
    ],
    "default": false,
}

export default {
    "type": "object",
    "properties": {
        "INTERVAL": interval,
        "FREQ": freq,
    },
    "dependencies": {
        "FREQ": {
            "oneOf": [
                {
                    "properties": {
                        "FREQ": {
                            "enum": ["YEARLY"]
                        },
                        "BYMONTHDAY": byMonthDay,
                        "BYMONTH": byMonth,
                        "BYSETPOS": bySetPos,
                        "BYDAY": byDay,
                        "ENDS": ends
                    }
                },
                {
                    "properties": {
                        "FREQ": {
                            "enum": ["MONTHLY"]
                        },
                        "BYMONTHDAY": byMonthDay,
                        "BYSETPOS": bySetPos,
                        "BYDAY": byDay,
                        "ENDS": ends
                    }
                },
                {
                    "properties": {
                        "FREQ": {
                            "enum": ["WEEKLY"]
                        },
                        "BYDAY": byDay,
                        "ENDS": ends
                    }
                },
                {
                    "properties": {
                        "FREQ": {
                            "enum": ["DAILY"]
                        },
                        "ENDS": ends
                     }
                },
                {
                    "properties": {
                        "FREQ": {
                            "enum": ["HOURLY"]
                        },
                        "BYDAY": byDay,
                        "ENDS": ends
                    }
                },
                {
                    "properties": {
                        "FREQ": {
                            "enum": ["MINUTELY"]
                        },
                        "BYDAY": byDay,
                        "ENDS": ends
                    }
                }
            ]
        },
        "ENDS": {
            "oneOf": [
                {
                    "properties": {
                        "ENDS": {
                            "enum": ["ON"]
                        },
                        "UNTIL": {
                            "type": "string",
                            "format": "date"
                        }
                    }
                },
                {
                    "properties": {
                        "ENDS": {
                            "enum": ["AFTER"]
                        },
                        "COUNT": {
                            "type": "number",
                            "default": 1
                        }
                    }
                }
            ]            
        }
    }    
}