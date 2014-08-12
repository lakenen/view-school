```
         __        _______ _     _       ____   ___  _   _ _____
         \ \      / / ____| |   | |     |  _ \ / _ \| \ | | ____|
          \ \ /\ / /|  _| | |   | |     | | | | | | |  \| |  _|
           \ V  V / | |___| |___| |___  | |_| | |_| | |\  | |___
            \_/\_/  |_____|_____|_____| |____/ \___/|_| \_|_____|

-------------------------- ===================== --------------------------
```

In this exercise, we used the `view` URL from the session response to show the document in an `iframe`. You might have noticed that the response actually contains three URLs: `view`, `assets`, `download` (if the session was created with `is_downloadable: true`) and `realtime`. The `assets` URL is used with viewer.js, the `download` URL is a download link for the original document, and we'll get to the `realtime` URL later in this workshop.

In the next lesson, we'll start working with viewer.js!

```
-------------------------- ===================== --------------------------
```
