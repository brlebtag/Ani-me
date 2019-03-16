# Ani-me
HorribleSubs torrent monitor


# default Config

Create a json file named .anime-me inside your home folder like this:

```
{
    "fetchIntervalMins": 15,
    "watching": {
        "Boruto – Naruto Next Generations": 97,
        "One Piece": 875
    },
    "rss": "http://www.horriblesubs.info/rss.php?res=720",
    "torrentClient": "transmission-gtk",
}
```

Any command parameter should be passed throught _torrentClient_ parameter.