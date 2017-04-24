Leaderboards
============

RESTful api microservice for creating leaderboards to keep track of players scores.

API
---
```/apps```

    POST:   Create a new application that boards can be linked to.
    
```/apps/<app-id>```

    GET:   Retrive an application by its id.

```/boards```

    POST:   Create a new board for keeping track of scores.


```/boards/<board-id>```

    DELETE: Delete a leaderboard and all score related data.
    GET:    Retrieve a score board by its id.
    PUT:    Update leaderboard details.
    
```/scores```

    POST:   Record a new score to the leaderboard identified inthe payload.

```/scores/<board-id>```

    GET:    Get the scores for a board