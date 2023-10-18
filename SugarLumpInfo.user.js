// ==UserScript==
// @name         Sugar Lump Info
// @version      1.0
// @description  Changes the sugar lump tooltip to hide unnecessary information, while showing more valuable info.
// @author       FrustratedProgrammer
// @match        *://orteil.dashnet.org/cookieclicker/
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM5SURBVFhH7ZdLSFRRGMdPagsle2jjoFBDFvZy7IE9NDS0TCi0xJSIFm2yMlqVtIggigKRaBFatNFaBIlmJRJkpWiailSYlg0ijYE1TQ/BUDLCOP87/0GPnkZ6wFzpD5ffPXcx3PnN933nzAyhSbzFOuq5/WXa3S7tZ/yNBHjot5nw7WkuMTUZ6+ysDWB45GqQ+fTuOXjsaBH4r0yax6AvczGxP0Cmf3Ap6GypAGlSl9817P8GVXPRy6PBNcssoG3jboM2G/j9832QBr86e0DW5LNut4gcKheOtkFjvSoB7LvRBjJTNWo+g/vmfwSbLevBrSlp4CzbEpCZzJyMNP/+abGIWmDFmul/6wJvfosFadSXSfMYDE3Iw4Oda0dA1mBwYw0YknsSZGiOXU7DsqsD3BUiZssmrNU4HjaBF3uMz/dl0nwG7cHdYF7+QZCmaJIZTtoBssujQl+Djs5AYbHcE/Os27CeGWaQ3f/FZZAm6yuNWr7TFQiqJs1jcPuB63jQ2PkYpEnOxV37D4M09aT2BZiQZgdpyul0itaSFJF14grWfM7QZFXhIZApKh0CzWfQQ+9erJpkV6vz8HbZZVDdceR8lDXIsBYZ1iCfc301/xqo1qJ5DDKqSYZGT++dAzK60w5DQ/Vlt8Dcwl6QtciwJtVaNK9B3d7MmlN3EHa3rmvV2mNUw6pB7QtycAdVXwI7kuaCBQ1vwOTwEFDsMQ6268LrwL7UErFwszGSZNTjGb8Iozv4TvknTh8dwFXd9QFX8pEUXLq4so9PqC8Z+WLykvNTXvLF5CW7niejyWL+Lmb3FjZdAEPijDk11GF0rXe9Ih605uSISPti3I8Nf0rOT85V7vWVVa1g86MG0LxdzKgmZ59PB9kcGSsjQFmXMmNNRhSU4n5s2AQ8eSe6x/9HyS9/CdIc4/cGgzz0mZrMU8bN3bNAXOMAmJHkMdnhMSnax3Wl+p+FpyJnizFPWXu6mLcGGV1Xc4AzHOQy1fZF3p1HDXciXdeqMb9BRjXJqEbPhY2I4eIz3r36QV0t2PvKOMUwvswx08cgQ5OMzijD/zY0xvgyx0w/g2pUo7pM1Zgavzf4P38WIX4ChaCYLVK7o7oAAAAASUVORK5CYII=
// ==/UserScript==
(function () {
    let readyCheck = setInterval(() => {
        let theGame = unsafeWindow.Game || Game || window.Game;
        if(typeof theGame !== 'undefined' && typeof theGame.ready !== 'undefined' && theGame.ready){
            theGame.LoadMod('https://frustrated-programmer.github.io/SugarLumpInfo/SugarLumpInfo.js');
            clearInterval(readyCheck);
            theGame = 0;
            readyCheck = 0;
        }
    }, 1000);
})();
