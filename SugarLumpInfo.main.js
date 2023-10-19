// ==UserScript==
// @name         Sugar Lump Info
// @version      1.0
// @description  Changes the sugar lump tooltip to hide unnecessary information, while showing more valuable info.
// @author       FrustratedProgrammer
// @match        *://orteil.dashnet.org/cookieclicker/
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM5SURBVFhH7ZdLSFRRGMdPagsle2jjoFBDFvZy7IE9NDS0TCi0xJSIFm2yMlqVtIggigKRaBFatNFaBIlmJRJkpWiailSYlg0ijYE1TQ/BUDLCOP87/0GPnkZ6wFzpD5ffPXcx3PnN933nzAyhSbzFOuq5/WXa3S7tZ/yNBHjot5nw7WkuMTUZ6+ysDWB45GqQ+fTuOXjsaBH4r0yax6AvczGxP0Cmf3Ap6GypAGlSl9817P8GVXPRy6PBNcssoG3jboM2G/j9832QBr86e0DW5LNut4gcKheOtkFjvSoB7LvRBjJTNWo+g/vmfwSbLevBrSlp4CzbEpCZzJyMNP/+abGIWmDFmul/6wJvfosFadSXSfMYDE3Iw4Oda0dA1mBwYw0YknsSZGiOXU7DsqsD3BUiZssmrNU4HjaBF3uMz/dl0nwG7cHdYF7+QZCmaJIZTtoBssujQl+Djs5AYbHcE/Os27CeGWaQ3f/FZZAm6yuNWr7TFQiqJs1jcPuB63jQ2PkYpEnOxV37D4M09aT2BZiQZgdpyul0itaSFJF14grWfM7QZFXhIZApKh0CzWfQQ+9erJpkV6vz8HbZZVDdceR8lDXIsBYZ1iCfc301/xqo1qJ5DDKqSYZGT++dAzK60w5DQ/Vlt8Dcwl6QtciwJtVaNK9B3d7MmlN3EHa3rmvV2mNUw6pB7QtycAdVXwI7kuaCBQ1vwOTwEFDsMQ6268LrwL7UErFwszGSZNTjGb8Iozv4TvknTh8dwFXd9QFX8pEUXLq4so9PqC8Z+WLykvNTXvLF5CW7niejyWL+Lmb3FjZdAEPijDk11GF0rXe9Ih605uSISPti3I8Nf0rOT85V7vWVVa1g86MG0LxdzKgmZ59PB9kcGSsjQFmXMmNNRhSU4n5s2AQ8eSe6x/9HyS9/CdIc4/cGgzz0mZrMU8bN3bNAXOMAmJHkMdnhMSnax3Wl+p+FpyJnizFPWXu6mLcGGV1Xc4AzHOQy1fZF3p1HDXciXdeqMb9BRjXJqEbPhY2I4eIz3r36QV0t2PvKOMUwvswx08cgQ5OMzijD/zY0xvgyx0w/g2pUo7pM1Zgavzf4P38WIX4ChaCYLVK7o7oAAAAASUVORK5CYII=
// ==/UserScript==
/**
 Sugar Lump Info. A mod designed to show you addtional info about sugar lumps.
 Copyright (C) 2023  Elijah Anderson<contact@frustratedprogrammer.com>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, version 3 of the License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
 **/
class LumpInfoClass{

    addSettings(){
        let settings = l("LumpInfoSettings");
        if(settings) return;
        let menu = l("menu");
        if(!menu) return;
        if(!menu.children[1]) return;
        if(!menu.children[1].innerHTML.toString().toLowerCase().includes("options")) return;
        let settingsHolder = menu.children[2];
        if(!settingsHolder) return;
        else settings = document.createElement("div");
        settings.id = "LumpInfoSettings";
        settings.classList.add("subsection");
        let settingsTitle = document.createElement("div");
        let buttonsHolder = document.createElement("div");
        buttonsHolder.classList = "listing";
        settingsTitle.classList.add("title");
        settingsTitle.id = "ModLumpInfo_SettingsTitle";
        settingsTitle.innerText = "Sugar Lump Info";
        settings.appendChild(settingsTitle);
        let description = document.createElement("div");
        description.classList.add("listing");
        settings.appendChild(description);
        let addCheckBox = (checked, oncheck, title, descript) => {
            description.appendChild(document.createElement("br"));
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = checked;
            description.appendChild(checkbox);
            let bolded = document.createElement("b");
            bolded.style.opacity = checked ? "1" : "0.5";
            bolded.innerText = title;
            description.appendChild(bolded);
            let label = document.createElement("label");
            label.innerText = descript;
            label.style.opacity = checked ? "0.5" : "0.25";
            description.appendChild(label);
            checkbox.oninput = function(){
                oncheck(this.checked);
                bolded.style.opacity = this.checked ? "1" : "0.5";
                label.style.opacity = this.checked ? "0.5" : "0.25";
            };
            description.appendChild(document.createElement("br"));
        };
        addCheckBox(this.showSpoilers, (checked) => {this.showSpoilers = checked;}, "Show Spoilers", "Show what type the sugar lump is, before the game normally tells you, including revealing the lump types before you've harvested that lump.");

        //BEFORE CookieMonster's settings though, they have a massive list of settings.
        //AND due to CookieMonster way of allowing user to close groups, any settings placed after their settings gets screwed up every redraw
        if(l("cookieMonsterFrameworkMenuSection")){
            settingsHolder.insertBefore(settings, l("cookieMonsterFrameworkMenuSection"));
        }
        else if(l("cookieMonsterModMenuSection")){
            settingsHolder.insertBefore(settings, l("cookieMonsterModMenuSection"));
        }
        else{
            settingsHolder.insertBefore(settings, settingsHolder.lastElementChild);
        }
    }

    createTooltip(){

        let tooltipDiv = document.createElement("div");
        tooltipDiv.style.padding = "8px";
        // tooltipDiv.style.paddingTop="0px";
        tooltipDiv.style.width = "400px";
        tooltipDiv.style.fontSize = "11px";
        tooltipDiv.style.textAlign = "center";
        tooltipDiv.id = "tooltipLump";
        if(Game.keys[16] || Game.keys[17]){

            let extraInfo2 = document.createElement("div");
            extraInfo2.innerHTML += "Sugar lumps can be harvested when mature, though if left alone beyond that point they will start ripening (increasing the chance of harvesting them) and will eventually fall and be auto-harvested after some time.";
            tooltipDiv.appendChild(extraInfo2);

            let line1 = document.createElement("div");
            line1.classList.add("line");
            tooltipDiv.appendChild(line1);
            let extraInfo = document.createElement("div");
            extraInfo.innerHTML += "Your sugar lumps mature after ";
            let bold1 = document.createElement("b");
            bold1.innerText = Game.sayTime((Game.lumpMatureAge / 1000) * Game.fps, -1);
            extraInfo.appendChild(bold1);
            extraInfo.appendChild(document.createElement("br"));
            extraInfo.innerHTML += "They ripen after ";
            let bold2 = document.createElement("b");
            bold2.innerText = Game.sayTime(((Game.lumpRipeAge - Game.lumpMatureAge) / 1000) * Game.fps, -1);
            extraInfo.appendChild(bold2);
            extraInfo.innerHTML += " afterwards";
            extraInfo.appendChild(document.createElement("br"));
            extraInfo.innerHTML += "And then they fall  ";
            let bold3 = document.createElement("b");
            bold3.innerText = "1 hour";
            extraInfo.appendChild(bold3);
            extraInfo.innerHTML += " later.";
            tooltipDiv.appendChild(extraInfo);
            let line2 = document.createElement("div");
            line2.classList.add("line");
            tooltipDiv.appendChild(line2);
            let extraInfo3 = document.createElement("div");
            extraInfo3.innerHTML = "1 lump is harvested every ";
            let bold4 = document.createElement("b");
            bold4.innerText = Game.sayTime((Game.lumpOverripeAge / 1000) * Game.fps, -1);
            extraInfo3.appendChild(bold4);
            tooltipDiv.appendChild(extraInfo3);


            let line3 = document.createElement("div");
            line3.classList.add("line");
            tooltipDiv.appendChild(line3);

            let tips = [
                "Sugar lumps are delicious and may be used as currency for all sorts of things.",
                "Once a sugar lump is harvested, another one will start growing in its place.",
                "Note that sugar lumps keep growing when the game is closed.",
                "Only the first Sugar lump harvested offline can have a special types.",
                "You need 55 sugar lumps to upgrade a building from 0 to 10"
            ];
            let upgradesReducingMature = [];
            let upgradesReducingRiping = [];
            let hour = 1000 * 60 * 60;
            let lumpMatureAge = hour * 20;
            let lumpRipeAge = hour * 23;
            if(Game.Has("Stevia Caelestis")){
                lumpRipeAge -= hour;
                upgradesReducingRiping.push(Game.Upgrades["Stevia Caelestis"]);
            }
            if(Game.Has("Diabetica Daemonicus")){
                lumpMatureAge -= hour;
                upgradesReducingMature.push(Game.Upgrades["Diabetica Daemonicus"]);
            }
            if(Game.Has("Ichor syrup")){
                lumpMatureAge -= 1000 * 60 * 7;
                upgradesReducingMature.push(Game.Upgrades["Ichor syrup"]);
            }
            if(Game.Has("Sugar aging process")){
                lumpRipeAge -= 6000 * Math.min(600, Game.Objects["Grandma"].amount);//capped at 600 grandmas
                upgradesReducingRiping.push(Game.Upgrades["Sugar aging process"]);
            }
            if(Game.hasGod && Game.BuildingsOwned % 10 === 0){
                let godLvl = Game.hasGod("order");
                if(godLvl === 1) lumpRipeAge -= hour;
                else if(godLvl === 2) lumpRipeAge -= (hour / 3) * 2;
                else if(godLvl === 3) lumpRipeAge -= (hour / 3);

                upgradesReducingRiping.push({
                    type: "God",
                    icon: [22, 19]
                });

            }

            let auraMult = Game.auraMult("Dragon's Curve");
            if(auraMult > 0){
                lumpMatureAge /= 1 + auraMult * 0.05;
                lumpRipeAge /= 1 + auraMult * 0.05;
                if(auraMult >= 1){
                    upgradesReducingRiping.push({
                        type: "Dragon Aura",
                        bought: 1,
                        unlocked: 1,
                        vanilla: 1,
                        icon: [20, 25]
                    });
                    upgradesReducingMature.push({
                        type: "Dragon Aura",
                        bought: 1,
                        unlocked: 1,
                        vanilla: 1,
                        icon: [20, 25]
                    });
                }
                if(auraMult > 1 || auraMult < 1){
                    upgradesReducingRiping.push({
                        type: "Dragon Aura",
                        bought: 1,
                        unlocked: 1,
                        vanilla: 1,
                        icon: [32, 25]
                    });
                    upgradesReducingMature.push({
                        type: "Dragon Aura",
                        bought: 1,
                        unlocked: 1,
                        vanilla: 1,
                        icon: [32, 25]
                    });
                }
            }
            if(Game.Has("Glucose-charged air")){
                lumpMatureAge /= 2000;
                lumpRipeAge /= 2000;
                upgradesReducingRiping.push(Game.Upgrades["Glucose-charged air"]);
                upgradesReducingMature.push(Game.Upgrades["Glucose-charged air"]);
            }
            if(Game.Has("Sugar baking")){
                tips.push(`Because of your <b>Sugar Baking</b> upgrade, you have a ${Math.min(Game.lumps, 100)}% bonus to CPS.`);
            }

            function pushTip(text, array, val){
                if(array.length > 0){
                    let types = {};
                    let crates = document.createElement("div");
                    crates.style.display = "block";
                    crates.style.position = "relative";
                    crates.style.width = (array.length * 20) + "px";
                    crates.style.height = "30px";
                    for(let i = 0; i < array.length; i++){
                        let upgrade = array[i];
                        types[upgrade.type] = types[upgrade.type] || 0;
                        types[upgrade.type]++;
                        let crate = document.createElement("div");
                        if(upgrade.icon[2]){
                            crate.style.backgroundImage = "url('" + upgrade.icon[2].replace(/'/g, "\\'") + "');";
                        }
                        else crate.style.backgroundImage = `url(${"https://cdn.dashnet.org/cookieclicker/img/icons.png?v=2.052".replace(/'/g, "\\'")})`;
                        crate.style.backgroundPositionX = `${(-upgrade.icon[0] * 48)}px`;
                        crate.style.backgroundPositionY = `${(-upgrade.icon[1] * 48)}px`;
                        if(upgrade.type === "Dragon Aura" && false){
                            crate.style.backgroundPositionX = `-5px`;
                            crate.style.backgroundPositionY = `-9px`;
                            crate.style.backgroundSize = "550px";
                            crate.style.backgroundImage = "url('https://cdn.dashnet.org/cookieclicker/img/dragon.png?v=2.052')";
                        }
                        crate.style.position = "absolute";
                        crate.style.top = "-10px";
                        crate.style.left = ((i * 30) - 10) + "px";
                        crate.style.margin = "0";
                        crate.classList.add("upgrade");
                        //God background:
                        //"https://cdn.dashnet.org/cookieclicker/img/spellBG.png"
                        crate.classList.add("crate");
                        if(upgrade.pool === "prestige"){
                            crate.classList.add("heavenly");
                        }
                        crate.classList.add("enabled");
                        crate.style.scale = "0.4";
                        crates.appendChild(crate);
                    }
                    let txts = [];
                    for(let i in types){
                        txts.push(`<b>${types[i]}</b> ${i}${types[i] > 1 ? "s" : ""}`);
                    }
                    let txt = "";
                    for(let i = 0; i < txts.length; i++){
                        if(i + 1 === txts.length && txt.length) txt += ", and ";
                        else if(txt) txt += ", ";
                        txt += txts[i];
                    }
                    tips.push(`Due to ${txt}, your sugar lump's ${text} time has been reduced by <b>${Game.sayTime((val / 1000) * Game.fps, -1)}</b><br>${crates.outerHTML}`);
                }
            }

            pushTip("mature", upgradesReducingMature, ((hour * 20) - lumpMatureAge));
            pushTip("ripen", upgradesReducingRiping, ((hour * 23) - lumpRipeAge));

            let ul = document.createElement("ul");
            ul.style.textAlign = "left";
            ul.style.listStyleType = "revert";
            ul.style.paddingLeft = "10px";
            for(let i = 0; i < tips.length; i++){
                let li = document.createElement("li");
                li.innerHTML = tips[i];
                ul.appendChild(li);
            }

            tooltipDiv.appendChild(ul);

            let line4 = document.createElement("div");
            line4.classList.add("line");
            tooltipDiv.appendChild(line4);
            return tooltipDiv.outerHTML;
        }
        else{
            let div = document.createElement("div");
            div.innerHTML = "You have ";
            let lumpsOwn = document.createElement("span");
            lumpsOwn.classList.add("price");
            lumpsOwn.classList.add("lump");
            lumpsOwn.innerHTML += `${Game.lumps} sugar lump${Game.lumps > 1 ? "s" : ""}`;
            div.appendChild(lumpsOwn);
            let line1 = document.createElement("div");
            line1.classList.add("line");
            div.appendChild(line1);
            div.innerHTML += "A ";
            let bold1 = document.createElement("b");
            bold1.innerText = "sugar lump";
            div.appendChild(bold1);
            div.innerHTML += " is coalescing here, attracted by your accomplishments.";
            let line2 = document.createElement("div");
            line2.classList.add("line");
            div.appendChild(line2);

            let CurrentLumpAge = Date.now() - Game.lumpT;
            let ageSpan = document.createElement("span");
            if(CurrentLumpAge < 0){
                ageSpan.innerHTML = "This sugar lump has been exposed to time travel shenanigans and will take an excruciating ";
                let bold2 = document.createElement("b");
                bold2.innerText = Game.sayTime(((Game.lumpMatureAge - CurrentLumpAge) / 1000 + 1) * Game.fps, -1);
                ageSpan.appendChild(bold2);
                ageSpan.innerHTML += " to reach maturity.";
                div.appendChild(ageSpan);
            }
            else if(CurrentLumpAge < Game.lumpMatureAge){
                ageSpan.innerHTML = "This sugar lump is still growing and will reach maturity after<br>";
                let bold2 = document.createElement("b");
                bold2.innerText = Game.sayTime(((Game.lumpMatureAge - CurrentLumpAge) / 1000 + 1) * Game.fps, -1);
                ageSpan.appendChild(bold2);
                ageSpan.innerHTML += ".";
                div.appendChild(ageSpan);
            }
            else if(CurrentLumpAge < Game.lumpRipeAge){
                ageSpan.innerHTML = "This sugar lump is mature and will be ripe in ";
                let bold2 = document.createElement("b");
                bold2.innerText = Game.sayTime(((Game.lumpRipeAge - CurrentLumpAge) / 1000 + 1) * Game.fps, -1);
                ageSpan.appendChild(bold2);
                ageSpan.innerHTML += ".";
                ageSpan.appendChild(document.createElement("br"));
                ageSpan.innerHTML += "You may ";
                let bold3 = document.createElement("b");
                bold3.innerText = "click it to harvest it now";
                ageSpan.appendChild(bold3);
                ageSpan.innerHTML += " but there is a ";
                let bold4 = document.createElement("b");
                bold4.innerText = "50% chance you won't get anything";
                ageSpan.appendChild(bold4);
                ageSpan.innerHTML += ".";
                div.appendChild(ageSpan);
            }
            else if(CurrentLumpAge < Game.lumpOverripeAge){
                let bold2 = document.createElement("b");
                bold2.innerText = "This sugar lump is ripe! Click it to harvest it.";
                ageSpan.appendChild(bold2);
                ageSpan.appendChild(document.createElement("br"));
                ageSpan.innerHTML += "If you do nothing, it will auto-harvest in ";
                let bold3 = document.createElement("b");
                bold3.innerText = Game.sayTime(((Game.lumpOverripeAge - CurrentLumpAge) / 1000 + 1) * Game.fps, -1);
                ageSpan.appendChild(bold3);
                ageSpan.innerHTML += ".";
                div.appendChild(ageSpan);
            }

            let line3 = document.createElement("div");
            line3.classList.add("line");
            div.appendChild(line3);

            let lumpType = document.createElement("span");
            if(this.showSpoilers || (CurrentLumpAge / Game.lumpOverripeAge) * 7 >= 3){
                if(Game.lumpCurrentType === 0){
                    lumpType.innerHTML += "This is a ";
                    let bold2 = document.createElement("b");
                    bold2.innerText = "sugar lump";
                    lumpType.appendChild(bold2);
                    lumpType.innerHTML += "; Harvesting it will yield 1 lump.";
                }
                else if(Game.lumpCurrentType === 1){
                    lumpType.innerHTML = "This sugar lump grew to be ";
                    let bold2 = document.createElement("b");
                    bold2.innerText = "bifurcated";
                    lumpType.appendChild(bold2);
                    lumpType.innerHTML += "; harvesting it has a 50% chance of yielding two lumps.";
                }
                else if(Game.lumpCurrentType === 2){
                    lumpType.innerHTML = "This sugar lump grew to be ";
                    let bold2 = document.createElement("b");
                    bold2.innerText = "golden";
                    lumpType.appendChild(bold2);
                    lumpType.innerHTML += "; harvesting it will yield 2 to 7 lumps, your current cookies will be doubled (capped to a gain of 24 hours of your CpS), and you will find 10% more golden cookies for the next 24 hours.";
                }
                else if(Game.lumpCurrentType === 3){
                    lumpType.innerHTML = "This sugar lump was affected by the elders and grew to be ";
                    let bold2 = document.createElement("b");
                    bold2.innerText = "meaty";
                    lumpType.appendChild(bold2);
                    lumpType.innerHTML += "; harvesting it will yield between 0 and 2 lumps.";
                }
                else if(Game.lumpCurrentType === 4){
                    lumpType.innerHTML = "This sugar lump grew to be ";
                    let bold2 = document.createElement("b");
                    bold2.innerText = "caramelized";
                    lumpType.appendChild(bold2);
                    lumpType.innerHTML += ", its stickiness binding it to unexpected things; harvesting it will yield between 1 and 3 lumps and will refill your sugar lump cooldowns.";
                }
            }
            else{
                lumpType.innerHTML = "This sugar lump is underage, you can't tell what type it is.";

            }
            div.appendChild(lumpType);
            let line4 = document.createElement("div");
            line4.classList.add("line");
            div.appendChild(line4);

            div.innerHTML += "Sugar Lump's Chances:";
            if(this.showSpoilers || (CurrentLumpAge / Game.lumpOverripeAge) * 7 >= 3){
                div.innerHTML += "<br>(current lump is highlighted)";
            }
            let lumpChances = document.createElement("table");
            lumpChances.style.marginTop = "5px";
            lumpChances.style.marginLeft = "auto";
            lumpChances.style.marginRight = "auto";
            let images = document.createElement("tr");
            let chances = document.createElement("tr");
            let currentChances = this.getLumpChances();
            for(let i = 0; i < this.lumpTypes.length; i++){
                let imgH = document.createElement("td");
                imgH.style.width = "55px";
                let img = document.createElement("div");
                img.style.marginLeft = "auto";
                img.style.marginRight = "auto";
                img.style.backgroundImage = "url('https://cdn.dashnet.org/cookieclicker/img/icons.png?v=2.052')";
                img.style.backgroundPositionX = 0 - (this.lumpTypes[i].icon[0] * 48) + "px";
                img.style.backgroundPositionY = 0 - (this.lumpTypes[i].icon[1] * 48) + "px";
                img.style.width = "48px";
                img.style.height = "48px";
                if(this.lumpTypes[i].unlocked() || this.showSpoilers){
                    img.style.opacity = 1;
                }
                else{
                    img.style.opacity = 0.5;
                    img.style.filter = "brightness(0.1)";
                }
                imgH.appendChild(img);
                images.appendChild(imgH);
                let chance = document.createElement("td");
                chance.style.color = "white";
                chance.style.width = "55px";
                chance.style.textShadow = "#000 3px 2px 3px";
                chance.style.paddingBottom = "5px";
                chance.innerHTML = `${(this.lumpTypes[i].unlocked() || this.showSpoilers) ? this.lumpTypes[i].type : "?????"}<br><i><b>${currentChances[this.lumpTypes[i].id]}%</b></i>`;
                chances.appendChild(chance);
                if(this.showSpoilers || (CurrentLumpAge / Game.lumpOverripeAge) * 7 >= 3){
                    if(Game.lumpCurrentType === this.lumpTypes[i].id){
                        chance.style.backgroundColor = this.lumpTypes[i].bg;
                        chance.style.borderRadius = "0px 0px 10px 10px";
                        img.style.filter += " drop-shadow(3px 3px 2px rgba(0,0,0,0.5)) "
                        imgH.style.borderRadius = "10px 10px 0px 0px";
                        imgH.style.backgroundColor = this.lumpTypes[i].bg;
                    }
                }

            }
            lumpChances.appendChild(images);
            lumpChances.appendChild(chances);
            div.appendChild(lumpChances);
            div.innerHTML += "<i style='font-size: 78%; font-style: italic'>(Press and hold CTRL or SHIFT for more info)</i>";
            tooltipDiv.appendChild(div);
            return tooltipDiv.outerHTML;
        }
    }

    getLumpChances(){
        let key = ``;
        let dragAura = Game.auraMult("Dragon's Curve");
        if(dragAura >= 0 && dragAura <= 1.1) key += `${dragAura}`;
        else key += Math.parseInt(dragAura) ? "1" : "0";
        let eldWrath = parseInt(Game.elderWrath);
        if(eldWrath < 4 && eldWrath >= 0) key += `${eldWrath}`;
        else key += `0`;
        key += `${Game.Has("Sucralosia Inutilis") ? 1 : 0}`;
        if(!this.probabilities[key]){
            console.log(key)
            key = "000";
        }
        return this.probabilities[key];
    }

    constructor(){
        this.showSpoilers = false;
        this.lumpTypes = [
            {
                type: "classic",
                id: 0,
                icon: [29, 14],
                unlocked: () => {
                    return Game.lumpsTotal > 0;
                },
                bg: "rgba(255,255,255,0.3)"

            },
            {
                type: "bifurcated",
                id: 1,
                icon: [29, 15],
                unlocked: () => {
                    return Game.Achievements["Sugar sugar"].won;
                },
                bg: "rgba(138,138,138,0.3)"
            },
            {
                type: "golden",
                id: 2,
                icon: [29, 16],
                unlocked: () => {
                    return Game.Achievements["All-natural cane sugar"].won;
                },
                bg: "rgb(194,160,0)"
            },
            {
                type: "meaty",
                id: 3,
                icon: [29, 17],
                unlocked: () => {
                    return Game.Achievements["Sweetmeats"].won;
                },
                bg: "rgba(255,60,60,0.3)"
            },
            {
                type: "carmelized",
                id: 4,
                icon: [29, 27],
                unlocked: () => {
                    return Game.Achievements["Maillard reaction"].won;
                },
                bg: "rgba(230,255,0,0.3)"
            }
        ];
        this.probabilities = {
            "000":{
                0: 93.92,
                1:4.96,
                2:0.14,
                3:0,
                4:0.96
            },//
            "010":{
                0:89.33,
                1:4.79,
                2:0.13,
                3:4.79,
                4:0.93
            },//
            "001":{
                0:91.46,
                1:7.44,
                2:0.14,
                3:0,
                4:0.94
            },//
            "011":{
                0:87.03,
                1:7.19,
                2:0.13,
                3:4.71,
                4:0.91,
            },//
            "020":{
                0:84.73,
                1:4.63,
                2:0.13,
                3:9.59,
                4:0.90
            },//
            "021":{
                0:82.60,
                1:6.94,
                2:0.13,
                3:9.42,
                4:0.88,
            },//
            "030":{
                0:80.14,
                1:4.46,
                2:0.13,
                3:14.38,
                4:0.87
            },//
            "031":{
                0:78.17,
                1:6.70,
                2:0.12,
                3:14.14,
                4:0.85
            },//
            "100":{
                0:88.34,
                1:9.52,
                2:0.27,
                3:0,
                4:1.85
            },//
            "101":{
                0:83.89,
                1:14.04,
                2:0.26,
                3:0,
                4:1.79
            },//
            "110":{
                0:80.16,
                1:8.91,
                2:0.25,
                3:8.91,
                4:1.73
            },//
            "111":{
                0:76.28,
                1:13.15,
                2:0.25,
                3:8.62,
                4:1.68
            },//
            "120":{
                0:72.53,
                1:8.34,
                2:0.24,
                3:17.24,
                4:1.6,
            },//
            "121":{
                0:69.17,
                1:12.31,
                2:0.23,
                3:16.69,
                4:1.57
            },//
            "130":{
                0:65.45,
                1:7.80,
                2:0.22,
                3:24.98,
                4:1.52
            },//
            "131":{
                0:62.56,
                1:11.52,
                2:0.22,
                3:24.20,
                4:1.47
            },//
            "0.100":{
                0:93.37,
                1:5.41,
                2:0.15,
                3:0,
                4:1.05
            },//
            "0.101":{
                0:90.71,
                1:8.10,
                2:0.15,
                3:0,
                4:1.03
            },//
            "0.110":{
                0:88.41,
                1:5.20,
                2:0.15,
                3:5.20,
                4:1.01
            },//
            "0.111":{
                0:85.96,
                1:7.79,
                2:0.14,
                3:5.10,
                4:0.99
            },//
            "0.120":{
                0:83.51,
                1:5.00,
                2:0.14,
                3:10.36,
                4:0.97
            },//
            "0.121":{
                0:81.26,
                1:7.48,
                2:0.14,
                3:10.15,
                4:0.95
            },//
            "0.130":{
                0:78.674,
                1:4.79,
                2:0.13,
                3:15.44,
                4:0.93
            },//
            "0.131":{
                0:76.61,
                1:7.18,
                2:0.13,
                3:15.14,
                4:0.91
            },//
            "1.100":{
                0:87.83,
                1:9.94,
                2:0.28,
                3:0,
                4:1.93
            },//
            "1.101":{
                0:83.22,
                1:14.62,
                2:0.27,
                3:0,
                4:1.86
            },//
            "1.110":{
                0:79.37,
                1:9.27,
                2:0.26,
                3:9.27,
                4:1.80
            },//
            "1.111":{
                0:75.38,
                1:13.65,
                2:0.26,
                3:8.95,
                4:1.74
            },//
            "1.120":{
                0:71.55,
                1:8.64,
                2:0.25,
                3:17.86,
                4:1.68
            },//
            "1.121":{
                0:68.12,
                1:12.73,
                2:0.24,
                3:17.26,
                4:1.63
            },//
            "1.130":{
                0:64.35,
                1:8.05,
                2:0.23,
                3:25.77,
                4:1.57
            },//
            "1.131":{
                0:61.42,
                1:11.88,
                2:0.22,
                3:24.93,
                4:1.52
            },//
        };
    }

    init(){
        Game.lumpTooltip = () => {
            return this.createTooltip();
        };
        Game.registerHook("logic", (value) => {
            this.addSettings();
            return value;
        });
    }

    save(){
        return `${this.showSpoilers ? 1 : 0}`;
    }

    load(save){
        /**
         * Saves across multiple versions
         * Version 1:
         * - showSpoilers ? 1 : 0
         */
        if(save){
            let split = save.split();
            if(split.length === 1){
                this.showSpoilers = split[0] === "1";
            }
        }
    }
}

const LumpInfoInterval = setInterval(() => {
    const theGame = Game || window.Game;
    if(typeof theGame !== "undefined" && typeof theGame.ready !== "undefined" && theGame.ready){
        theGame.registerMod("SugarLumpInfo", new LumpInfoClass());
        clearInterval(LumpInfoInterval);
    }
}, 1000);
