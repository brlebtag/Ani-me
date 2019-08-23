# Ani-me
HorribleSubs torrent monitor


# Configuration

Create a json file named `.ani-me` inside your home's folder like this:

```
{
    "fetchIntervalMins": 15,
    "watching": {
        "Boruto – Naruto Next Generations": 97,
        "One Piece": 875
    },
    "rss": "http://www.horriblesubs.info/rss.php?res=720",
    "torrentClient": "transmission-gtk {magnet}",
    "precision": 0.7
}
```

1. `"fetchIntervalMins"`: minutes between each request. Default to **15**.

2. `"watching"`: Contains a pair with show's name and show's last episode number.

3. `"rss"`: RSS url to check for new episodes. Default to **[http://www.horriblesubs.info/rss.php?res=720](http://www.horriblesubs.info/rss.php?res=720)**.

4. `"torrentClient"`: Torrent client that will be called. Any additional parameters should be passed here. Default to **transmission-gtk {magnet}**. Ani-me will replace `{magnet}` for the magnet link string.

5. `"precision"`: How close the show's name you informed should be equal to RSS show's name to be considered the same show. Ranging from 0 to 1. Default to **0.7**.
