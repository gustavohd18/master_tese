import React from "react";
import WordCloud from "react-d3-cloud";

export interface MyComponentWordsProps {
  words: WordsCloud[];
  functionDis: (param: string) => void;
}

export interface WordsCloud {
  text: string;
  value: number;
}

const WordCloudCustom: React.FC<MyComponentWordsProps> = ({
  words,
  functionDis,
}) => {
  const data = words
  // const data = [
  //   {
  //     "text": "Clinton",
  //     "value": 190
  //   },
  //   {
  //     "text": "lol",
  //     "value": 90
  //   },
  //   {
  //     "text": "bad",
  //     "value": 300
  //   },
  //   {
  //     "text": "disgusting",
  //     "value": 200
  //   },
  //   {
  //     "text": "security",
  //     "value": 600
  //   },
  //   {
  //     "text": "Obama",
  //     "value": 3
  //   },
  //   {
  //     "text": "no",
  //     "value": 3
  //   },
  //   {
  //     "text": "nooo",
  //     "value": 3
  //   },
  //   {
  //     "text": "yes",
  //     "value": 3
  //   },
  //   {
  //     "text": "noo",
  //     "value": 3
  //   },
  //   {
  //     "text": "Russia",
  //     "value": 400
  //   },
  //   {
  //     "text": "USA",
  //     "value": 300
  //   },
  //   {
  //     "text": "bbc",
  //     "value": 600
  //   },
  //   {
  //     "text": "crazy",
  //     "value": 300
  //   },
  //   {
  //     "text": "jeff",
  //     "value": 200
  //   },
  //   {
  //     "text": "president",
  //     "value": 400
  //   },
  //   {
  //     "text": "#freeBillClinton",
  //     "value": 700
  //   },
  //   {
  //     "text": "Bill",
  //     "value": 460
  //   },
  //   {
  //     "text": "tosecure",
  //     "value": 80
  //   },
    
  //   {
  //     "text": "Lies",
  //     "value": 130
  //   },
  //   {
  //     "text": "and",
  //     "value": 48
  //   },
  //   {
  //     "text": "in",
  //     "value": 33
  //   },
  //   {
  //     "text": "the",
  //     "value": 79
  //   },
  //   {
  //     "text": "confusion",
  //     "value": 99
  //   },
  //   {
  //     "text": "months,",
  //     "value": 3
  //   },
  //   {
  //     "text": "ahhh",
  //     "value": 61
  //   },
  //   {
  //     "text": "lot",
  //     "value": 21
  //   },
  //   {
  //     "text": "more",
  //     "value": 75
  //   },
  //   {
  //     "text": "people",
  //     "value": 70
  //   },
  //   {
  //     "text": "Post",
  //     "value": 73
  //   },
  //   {
  //     "text": "wasnt",
  //     "value": 52
  //   },
  //   {
  //     "text": "sony's",
  //     "value": 52
  //   },
  //   {
  //     "text": "day",
  //     "value": 75
  //   },
  //   {
  //     "text": "today\nit",
  //     "value": 87
  //   },
  //   {
  //     "text": "werent",
  //     "value": 57
  //   },
  //   {
  //     "text": "their",
  //     "value": 87
  //   },
  //   {
  //     "text": "First",
  //     "value": 35
  //   }
  // ]
  // [
  //   {
  //     "text": "Konami",
  //     "value": 190
  //   },
  //   {
  //     "text": "lol",
  //     "value": 17
  //   },
  //   {
  //     "text": "matan",
  //     "value": 90
  //   },
  //   {
  //     "text": "at",
  //     "value": 45
  //   },
  //   {
  //     "text": "the",
  //     "value": 13
  //   },
  //   {
  //     "text": "end",
  //     "value": 10
  //   },
  //   {
  //     "text": "BillClinton",
  //     "value": 460
  //   },
  //   {
  //     "text": "and",
  //     "value": 48
  //   },
  //   {
  //     "text": "in",
  //     "value": 33
  //   },
  //   {
  //     "text": "the",
  //     "value": 79
  //   },
  //   {
  //     "text": "9",
  //     "value": 99
  //   },
  //   {
  //     "text": "months,",
  //     "value": 3
  //   },
  //   {
  //     "text": "a",
  //     "value": 61
  //   },
  //   {
  //     "text": "lot",
  //     "value": 21
  //   },
  //   {
  //     "text": "more",
  //     "value": 75
  //   },
  //   {
  //     "text": "people",
  //     "value": 70
  //   },
  //   {
  //     "text": "played",
  //     "value": 32
  //   },
  //   {
  //     "text": "elden",
  //     "value": 58
  //   },
  //   {
  //     "text": "ring",
  //     "value": 38
  //   },
  //   {
  //     "text": "than",
  //     "value": 50
  //   },
  //   {
  //     "text": "gow",
  //     "value": 87
  //   },
  //   {
  //     "text": "ragnarok,",
  //     "value": 42
  //   },
  //   {
  //     "text": "so",
  //     "value": 25
  //   },
  //   {
  //     "text": "more",
  //     "value": 73
  //   },
  //   {
  //     "text": "people",
  //     "value": 78
  //   },
  
  //   {
  //     "text": "Vampire",
  //     "value": 75
  //   },
  //   {
  //     "text": "-",
  //     "value": 79
  //   },
  //   {
  //     "text": "Valiant",
  //     "value": 95
  //   },
  //   {
  //     "text": "Hearts\n0:06:09",
  //     "value": 54
  //   },
  //   {
  //     "text": "-",
  //     "value": 61
  //   },
  //   {
  //     "text": "Returnal",
  //     "value": 3
  //   },
  //   {
  //     "text": "(PC)\n0:11:18",
  //     "value": 3
  //   },
  //   {
  //     "text": "-",
  //     "value": 48
  //   },
  //   {
  //     "text": "Hellboy:",
  //     "value": 53
  //   },
  //   {
  //     "text": "Web",
  //     "value": 29
  //   },
  //   {
  //     "text": "of",
  //     "value": 96
  //   },
  //   {
  //     "text": "Wyrd\n0:14:46",
  //     "value": 13
  //   },
  //   {
  //     "text": "-",
  //     "value": 18
  //   },
  //   {
  //     "text": "Call",
  //     "value": 51
  //   },
  //   {
  //     "text": "of",
  //     "value": 17
  //   },
  //   {
  //     "text": "the",
  //     "value": 78
  //   },
  //   {
  //     "text": "Mountain",
  //     "value": 71
  //   },
  //   {
  //     "text": "(VR)\n0:15:21",
  //     "value": 88
  //   },
  //   {
  //     "text": "-",
  //     "value": 83
  //   },
  //   {
  //     "text": "Post",
  //     "value": 73
  //   },
  //   {
  //     "text": "-",
  //     "value": 76
  //   },
  //   {
  //     "text": "-",
  //     "value": 59
  //   },
  //   {
  //     "text": "Atomic",
  //     "value": 10
  //   },
  //   {
  //     "text": "Heart\n0:18:43",
  //     "value": 59
  //   },
  //   {
  //     "text": "-",
  //     "value": 78
  //   },
  //   {
  //     "text": "Scars",
  //     "value": 8
  //   },
  //   {
  //     "text": "Above\n0:19:43",
  //     "value": 85
  //   },
  //   {
  //     "text": "-",
  //     "value": 16
  //   },
  //   {
  //     "text": "Relic",
  //     "value": 3
  //   },
  //   {
  //     "text": "Hunters",
  //     "value": 97
  //   },
  //   {
  //     "text": "Legend\n0:21:22",
  //     "value": 16
  //   },
  //   {
  //     "text": "-",
  //     "value": 32
  //   },
  //   {
  //     "text": "Among",
  //     "value": 66
  //   },
  //   {
  //     "text": "Us:",
  //     "value": 47
  //   },
  //   {
  //     "text": "Hide",
  //     "value": 8
  //   },
  //   {
  //     "text": "N",
  //     "value": 76
  //   },
  //   {
  //     "text": "Seek\n0:22:51",
  //     "value": 97
  //   },
  //   {
  //     "text": "-",
  //     "value": 7
  //   },
  //   {
  //     "text": "After",
  //     "value": 87
  //   },
  //   {
  //     "text": "Us\n0:24:54",
  //     "value": 46
  //   },
  //   {
  //     "text": "-",
  //     "value": 27
  //   },
  //   {
  //     "text": "Replaced\n0:28:32",
  //     "value": 40
  //   },
  //   {
  //     "text": "-",
  //     "value": 13
  //   },
  //   {
  //     "text": "Street",
  //     "value": 79
  //   },
  //   {
  //     "text": "Fighter",
  //     "value": 71
  //   },
  //   {
  //     "text": "6\n\n0:48:06",
  //     "value": 63
  //   },
  //   {
  //     "text": "-",
  //     "value": 48
  //   },
  //   {
  //     "text": "Hades",
  //     "value": 52
  //   },
  //   {
  //     "text": "II\n0:51:06",
  //     "value": 36
  //   },
  //   {
  //     "text": "-",
  //     "value": 38
  //   },
  //   {
  //     "text": "Judas\n0:53:18",
  //     "value": 0
  //   },
  //   {
  //     "text": "-",
  //     "value": 49
  //   },
  //   {
  //     "text": "Bayonetta",
  //     "value": 72
  //   },
  //   {
  //     "text": "Origins:",
  //     "value": 15
  //   },
  //   {
  //     "text": "Cereza",
  //     "value": 10
  //   },
  //   {
  //     "text": "and",
  //     "value": 75
  //   },
  //   {
  //     "text": "the",
  //     "value": 61
  //   },
  //   {
  //     "text": "Lost",
  //     "value": 96
  //   },
  //   {
  //     "text": "Demon\n0:58:45",
  //     "value": 46
  //   },
  //   {
  //     "text": "-",
  //     "value": 51
  //   },
  //   {
  //     "text": "Ghostbusters:",
  //     "value": 8
  //   },
  //   {
  //     "text": "Rise",
  //     "value": 53
  //   },
  //   {
  //     "text": "of",
  //     "value": 94
  //   },
  //   {
  //     "text": "the",
  //     "value": 21
  //   },
  //   {
  //     "text": "Ghost",
  //     "value": 46
  //   },
  //   {
  //     "text": "Lord",
  //     "value": 50
  //   },
  //   {
  //     "text": "VR\n1:08:17",
  //     "value": 2
  //   },
  //   {
  //     "text": "-",
  //     "value": 83
  //   },
  //   {
  //     "text": "Destiny",
  //     "value": 15
  //   },
  //   {
  //     "text": "2:",
  //     "value": 84
  //   },
  //   {
  //     "text": "Lightfall\n1:09:52",
  //     "value": 73
  //   },
  //   {
  //     "text": "-",
  //     "value": 78
  //   },
  //   {
  //     "text": "Suicide",
  //     "value": 48
  //   },
  //   {
  //     "text": "Squad:",
  //     "value": 56
  //   },
  //   {
  //     "text": "Kill",
  //     "value": 31
  //   },
  //   {
  //     "text": "the",
  //     "value": 2
  //   },
  //   {
  //     "text": "Justice",
  //     "value": 34
  //   },
  //   {
  //     "text": "League\n1:15:11",
  //     "value": 15
  //   },
  //   {
  //     "text": "-",
  //     "value": 94
  //   },
  //   {
  //     "text": "Party",
  //     "value": 86
  //   },
  //   {
  //     "text": "Clinton",
  //     "value": 5
  //   },
  //   {
  //     "text": "didn't",
  //     "value": 67
  //   },
  //   {
  //     "text": "get",
  //     "value": 19
  //   },
  //   {
  //     "text": "I’m",
  //     "value": 2
  //   },
  //   {
  //     "text": "extremely",
  //     "value": 56
  //   },
  //   {
  //     "text": "happy",
  //     "value": 46
  //   },
  //   {
  //     "text": "for",
  //     "value": 81
  //   },
  //   {
  //     "text": "Elden",
  //     "value": 40
  //   },
  //   {
  //     "text": "Ring",
  //     "value": 37
  //   },
  //   {
  //     "text": "and",
  //     "value": 8
  //   },
  //   {
  //     "text": "it’s",
  //     "value": 46
  //   },
  //   {
  //     "text": "creators.",
  //     "value": 17
  //   },
  //   {
  //     "text": "BILL",
  //     "value": 62
  //   },
  //   {
  //     "text": "CLINTON",
  //     "value": 14
  //   },
  //   {
  //     "text": "‼️",
  //     "value": 19
  //   },
  //   {
  //     "text": "thats",
  //     "value": 40
  //   },
  //   {
  //     "text": "how",
  //     "value": 23
  //   },
  //   {
  //     "text": "u",
  //     "value": 22
  //   },
  //   {
  //     "text": "do",
  //     "value": 94
  //   },
  //   {
  //     "text": "dat",
  //     "value": 70
  //   },
  //   {
  //     "text": "elden",
  //     "value": 58
  //   },
  //   {
  //     "text": "ring!!!\n\nit",
  //     "value": 74
  //   },
  //   {
  //     "text": "wasnt",
  //     "value": 52
  //   },
  //   {
  //     "text": "sony's",
  //     "value": 52
  //   },
  //   {
  //     "text": "day",
  //     "value": 75
  //   },
  //   {
  //     "text": "today\nit",
  //     "value": 87
  //   },
  //   {
  //     "text": "werent",
  //     "value": 57
  //   },
  //   {
  //     "text": "their",
  //     "value": 87
  //   },
  //   {
  //     "text": "day",
  //     "value": 79
  //   },
  //   {
  //     "text": "last",
  //     "value": 20
  //   },
  //   {
  //     "text": "year\nits",
  //     "value": 58
  //   },
  //   {
  //     "text": "okay",
  //     "value": 32
  //   },
  //   {
  //     "text": "tho\nkeep",
  //     "value": 90
  //   },
  //   {
  //     "text": "yo",
  //     "value": 15
  //   },
  //   {
  //     "text": "head",
  //     "value": 47
  //   },
  //   {
  //     "text": "held",
  //     "value": 33
  //   },
  //   {
  //     "text": "high\ncuz",
  //     "value": 3
  //   },
  //   {
  //     "text": "we'll",
  //     "value": 18
  //   },
  //   {
  //     "text": "see",
  //     "value": 41
  //   },
  //   {
  //     "text": "you",
  //     "value": 24
  //   },
  //   {
  //     "text": "again",
  //     "value": 54
  //   },
  //   {
  //     "text": "next",
  //     "value": 57
  //   },
  //   {
  //     "text": "year",
  //     "value": 3
  //   },
  //   {
  //     "text": "Shoutout",
  //     "value": 8
  //   },
  //   {
  //     "text": "to",
  //     "value": 66
  //   },
  //   {
  //     "text": "Flute",
  //     "value": 92
  //   },
  //   {
  //     "text": "Guy.",
  //     "value": 51
  //   },
  //   {
  //     "text": "He",
  //     "value": 90
  //   },
  //   {
  //     "text": "was",
  //     "value": 38
  //   },
  //   {
  //     "text": "going",
  //     "value": 36
  //   },
  //   {
  //     "text": "HAM.",
  //     "value": 46
  //   },
  //   {
  //     "text": "Amazing",
  //     "value": 84
  //   },
  //   {
  //     "text": "show!",
  //     "value": 12
  //   },
  //   {
  //     "text": "This",
  //     "value": 74
  //   },
  //   {
  //     "text": "Game",
  //     "value": 69
  //   },
  //   {
  //     "text": "Awards",
  //     "value": 38
  //   },
  //   {
  //     "text": "show",
  //     "value": 85
  //   },
  //   {
  //     "text": "was",
  //     "value": 0
  //   },
  //   {
  //     "text": "for",
  //     "value": 3
  //   },
  //   {
  //     "text": "Reformed",
  //     "value": 17
  //   },
  //   {
  //     "text": "Orthodox",
  //     "value": 87
  //   },
  //   {
  //     "text": "Rabbi",
  //     "value": 65
  //   },
  //   {
  //     "text": "Bill",
  //     "value": 28
  //   },
  //   {
  //     "text": "Clinton",
  //     "value": 69
  //   },
  //   {
  //     "text": "3:49:26",
  //     "value": 30
  //   },
  //   {
  //     "text": "YOOO",
  //     "value": 15
  //   },
  //   {
  //     "text": "HE'S",
  //     "value": 20
  //   },
  //   {
  //     "text": "NOT",
  //     "value": 73
  //   },
  //   {
  //     "text": "EVEN",
  //     "value": 15
  //   },
  //   {
  //     "text": "ON",
  //     "value": 28
  //   },
  //   {
  //     "text": "THE",
  //     "value": 41
  //   },
  //   {
  //     "text": "FROMSOFTWARE",
  //     "value": 16
  //   },
  //   {
  //     "text": "GROUP",
  //     "value": 42
  //   },
  //   {
  //     "text": "OUT",
  //     "value": 6
  //   },
  //   {
  //     "text": "GUY????",
  //     "value": 68
  //   },
  //   {
  //     "text": "#FreeBillClintonGuy",
  //     "value": 36
  //   },
  //   {
  //     "text": "Where",
  //     "value": 45
  //   },
  //   {
  //     "text": "silksong",
  //     "value": 46
  //   },
  //   {
  //     "text": "They",
  //     "value": 97
  //   },
  //   {
  //     "text": "just",
  //     "value": 74
  //   },
  //   {
  //     "text": "let",
  //     "value": 71
  //   },
  //   {
  //     "text": "you",
  //     "value": 58
  //   },
  //   {
  //     "text": "next",
  //     "value": 84
  //   },
  //   {
  //     "text": "year!",
  //     "value": 55
  //   },
  //   {
  //     "text": "w",
  //     "value": 60
  //   },
  //   {
  //     "text": "I",
  //     "value": 16
  //   },
  //   {
  //     "text": "can't",
  //     "value": 83
  //   },
  //   {
  //     "text": "believe",
  //     "value": 98
  //   },
  //   {
  //     "text": "Bill",
  //     "value": 82
  //   },
  //   {
  //     "text": "Clinton",
  //     "value": 12
  //   },
  //   {
  //     "text": "won",
  //     "value": 29
  //   },
  //   {
  //     "text": "game",
  //     "value": 89
  //   },
  //   {
  //     "text": "of",
  //     "value": 26
  //   },
  //   {
  //     "text": "the",
  //     "value": 96
  //   },
  //   {
  //     "text": "year",
  //     "value": 89
  //   },
  //   {
  //     "text": "Big",
  //     "value": 84
  //   },
  //   {
  //     "text": "shoutout",
  //     "value": 96
  //   },
  //   {
  //     "text": "to",
  //     "value": 51
  //   },
  //   {
  //     "text": "Bill",
  //     "value": 33
  //   },
  //   {
  //     "text": "Clinton!",
  //     "value": 51
  //   },
  //   {
  //     "text": "This",
  //     "value": 17
  //   },
  //   {
  //     "text": "is",
  //     "value": 29
  //   },
  //   {
  //     "text": "where",
  //     "value": 9
  //   },
  //   {
  //     "text": "the",
  //     "value": 87
  //   },
  //   {
  //     "text": "fun",
  //     "value": 85
  //   },
  //   {
  //     "text": "begins",
  //     "value": 21
  //   },
  //   {
  //     "text": "Who",
  //     "value": 95
  //   },
  //   {
  //     "text": "was",
  //     "value": 72
  //   },
  //   {
  //     "text": "the",
  //     "value": 64
  //   },
  //   {
  //     "text": "Bill",
  //     "value": 31
  //   },
  //   {
  //     "text": "Clinton",
  //     "value": 74
  //   },
  //   {
  //     "text": "kid?",
  //     "value": 87
  //   },
  //   {
  //     "text": "this",
  //     "value": 10
  //   },
  //   {
  //     "text": "event",
  //     "value": 93
  //   },
  //   {
  //     "text": "was",
  //     "value": 86
  //   },
  //   {
  //     "text": "horrible",
  //     "value": 95
  //   },
  //   {
  //     "text": "this",
  //     "value": 40
  //   },
  //   {
  //     "text": "year\n2020",
  //     "value": 2
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "game",
  //     "value": 56
  //   },
  //   {
  //     "text": "winning",
  //     "value": 22
  //   },
  //   {
  //     "text": "in",
  //     "value": 53
  //   },
  //   {
  //     "text": "a",
  //     "value": 47
  //   },
  //   {
  //     "text": "year",
  //     "value": 57
  //   },
  //   {
  //     "text": "it",
  //     "value": 81
  //   },
  //   {
  //     "text": "dint",
  //     "value": 9
  //   },
  //   {
  //     "text": "come",
  //     "value": 93
  //   },
  //   {
  //     "text": "out\nGOW",
  //     "value": 86
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "winning",
  //     "value": 35
  //   },
  //   {
  //     "text": "GOW",
  //     "value": 600
  //   },
  //   {
  //     "text": "ROBBED!",
  //     "value": 78
  //   },
  //   {
  //     "text": "AplateTales",
  //     "value": 400
  //   },
  //   {
  //     "text": "godofwar",
  //     "value": 1200
  //   },
  //   {
  //     "text": "eldenring",
  //     "value": 1100
  //   },
  //   {
  //     "text": "ELDEN",
  //     "value": 760
  //   },
  //   {
  //     "text": "RING",
  //     "value": 76
  //   },
  //   {
  //     "text": "Best",
  //     "value": 29
  //   },
  //   {
  //     "text": "Game",
  //     "value": 49
  //   },
  //   {
  //     "text": "Awards",
  //     "value": 180
  //   },
  //   {
  //     "text": "in",
  //     "value": 20
  //   },
  //   {
  //     "text": "horizon",
  //     "value": 10000
  //   },
  //   {
  //     "text": "long",
  //     "value": 66
  //   },
  //   {
  //     "text": "while",
  //     "value": 95
  //   },
  //   {
  //     "text": "First",
  //     "value": 35
  //   }
  // ]
  const handleTooltipClick = () => {
    // const xAxisValue = params.name; // Retrieve the xAxis value
    console.log("clicked");
    functionDis("");
    // Call your desired function or perform any action here
  };

  return (
    <div style={{height: 1000, width: 1000}}>
      <WordCloud
        data={data}
        // data={data}
        width={900}
        height={600}
        font="Times"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => Math.log2(word.value) * 5}
        spiral="rectangular"
        rotate={(word) => word.value % 10}
        padding={5}
        random={Math.random}
        onWordClick={(event, d) => {
          console.log(`onWordClick: ${d.text}`);
          handleTooltipClick();
        }}
        onWordMouseOver={(event, d) => {
          console.log(`onWordMouseOver: ${d.text}`);
        }}
        onWordMouseOut={(event, d) => {
          console.log(`onWordMouseOut: ${d.text}`);
        }}
      />
      ,
    </div>
  );
};

export default WordCloudCustom;
