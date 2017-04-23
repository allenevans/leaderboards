Scoreboard
==========

RESTful api microservice for creating scoreboards to keep track of players scores.

API
---
```/boards<board-id?>```

    DELETE: Delete a scoreboard and all score related data.
    GET:    Retrieve a score board by its id.
    POST:   Create a new board for keeping track of scores.
    PUT:    Update scoreboard details.
    
```/scores```

    POST:   Record a new score to the scoreboard identified inthe payload.
    