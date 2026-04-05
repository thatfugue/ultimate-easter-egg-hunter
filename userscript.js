// ==UserScript==
// @name         🥚 Ultimate Easter Egg Hunter
// @namespace    https://torn.com/
// @version      1.6.1
// @description  The most advanced Easter Egg Navigator for Torn — 100+ unique pages, premium UI, smart detection, mobile-ready.
// @match        https://www.torn.com/*
// @author       sercann
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-end
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/572147/%F0%9F%A5%9A%20Ultimate%20Easter%20Egg%20Hunter.user.js
// @updateURL https://update.greasyfork.org/scripts/572147/%F0%9F%A5%9A%20Ultimate%20Easter%20Egg%20Hunter.meta.js
// ==/UserScript==

'use strict';

if (window.top !== window.self) return;

const CFG = {
    storageKey:   'ueeh_v1',
    eggRoot:      '#easter-egg-hunt-root',
    eggButton:    'button',
    notifDuration: 4000,
};

const PAGES = [
    { label: "Home",                            url: "/" },
    { label: "Preferences",                     url: "/preferences.php" },
    { label: "Personal Stats",                  url: "/personalstats.php" },
    { label: "Player Report",                   url: "/playerreport.php" },
    { label: "Activity Log",                    url: "/page.php?sid=log" },
    { label: "Attack Log",                      url: "/loader.php?sid=attackLog" },
    { label: "Events",                          url: "/page.php?sid=events" },
    { label: "Profile",                         url: "/profiles.php?XID=1" },
    { label: "Awards",                          url: "/page.php?sid=awards" },
    { label: "Hall of Fame",                    url: "/page.php?sid=hof" },
    { label: "Revive",                          url: "/revive.php" },
    { label: "PC",                              url: "/pc.php" },
    { label: "City",                            url: "/city.php" },
    { label: "City Stats",                      url: "/citystats.php" },
    { label: "Users Online",                    url: "/usersonline.php" },
    { label: "User List",                       url: "/page.php?sid=UserList" },
    { label: "Peoples",                         url: "/index.php?page=people", overseas: true },
    { label: "Fortune Teller",                  url: "/index.php?page=fortune", overseas: true },
    { label: "Rehab",                           url: "/index.php?page=rehab", overseas: true },
    { label: "Hunting",                         url: "/index.php?page=hunting", overseas: true },
    { label: "Items",                           url: "/item.php" },
    { label: "Item Mods",                       url: "/page.php?sid=itemsMods" },
    { label: "Ammo",                            url: "/page.php?sid=ammo" },
    { label: "Display Case",                    url: "/displaycase.php" },
    { label: "Keepsakes",                       url: "/page.php?sid=keepsakes" },
    { label: "Trade",                           url: "/trade.php" },
    { label: "Museum",                          url: "/museum.php" },
    { label: "Auction Market",                  url: "/amarket.php" },
    { label: "Point Market",                    url: "/pmarket.php" },
    { label: "Item Market",                     url: "/page.php?sid=ItemMarket" },
    { label: "Bazaar",                          url: "/page.php?sid=bazaar" },
    { label: "Stocks",                          url: "/page.php?sid=stocks" },
    { label: "Bank",                            url: "/bank.php" },
    { label: "Points",                          url: "/points.php" },
    { label: "Loan",                            url: "/loan.php" },
    { label: "Donator",                         url: "/donator.php" },
    { label: "Token Shop",                      url: "/token_shop.php" },
    { label: "Freebies",                        url: "/freebies.php" },
    { label: "Bring a Friend",                  url: "/bringafriend.php" },
    { label: "Bounties",                        url: "/bounties.php" },
    { label: "Big Al's Gun Shop",               url: "/bigalgunshop.php" },
    { label: "Bits N' Bobs",                    url: "/shops.php?step=bitsnbobs" },
    { label: "Cyberforce",                      url: "/shops.php?step=cyberforce" },
    { label: "Docks",                           url: "/shops.php?step=docks" },
    { label: "Jewelry",                         url: "/shops.php?step=jewelry" },
    { label: "Nike-H",                          url: "/shops.php?step=nikeh" },
    { label: "Pawn Shop",                       url: "/shops.php?step=pawnshop" },
    { label: "Pharmacy",                        url: "/shops.php?step=pharmacy" },
    { label: "Post Office",                     url: "/shops.php?step=postoffice" },
    { label: "Print Store",                     url: "/shops.php?step=printstore" },
    { label: "Recycling Center",                url: "/shops.php?step=recyclingcenter" },
    { label: "Supermarket",                     url: "/shops.php?step=super" },
    { label: "Candy Shop",                      url: "/shops.php?step=candy" },
    { label: "Clothes Shop",                    url: "/shops.php?step=clothes" },
    { label: "Bunker",                          url: "/page.php?sid=bunker" },
    { label: "Properties",                      url: "/properties.php" },
    { label: "Rental Market",                   url: "/properties.php?step=rentalmarket" },
    { label: "Selling Market",                  url: "/properties.php?step=sellingmarket" },
    { label: "Estate Agents",                   url: "/estateagents.php" },
    { label: "Casino",                          url: "/casino.php" },
    { label: "Slots",                           url: "/page.php?sid=slots" },
    { label: "Roulette",                        url: "/page.php?sid=roulette" },
    { label: "High/Low",                        url: "/page.php?sid=highlow" },
    { label: "Keno",                            url: "/page.php?sid=keno" },
    { label: "Craps",                           url: "/page.php?sid=craps" },
    { label: "Bookie",                          url: "/page.php?sid=bookie" },
    { label: "Lottery",                         url: "/page.php?sid=lottery" },
    { label: "Blackjack",                       url: "/page.php?sid=blackjack" },
    { label: "Hold'em",                         url: "/page.php?sid=holdem" },
    { label: "Russian Roulette",                url: "/page.php?sid=russianRoulette" },
    { label: "Spin The Wheel",                  url: "/page.php?sid=spinTheWheel" },
    { label: "Dump",                            url: "/dump.php" },
    { label: "Crimes 1.0",                      url: "/crimes.php" },
    { label: "Crimes 2.0",                      url: "/page.php?sid=crimes" },
    { label: "Criminal Records",                url: "/page.php?sid=crimesRecord" },
    { label: "Missions",                        url: "/loader.php?sid=missions" },
    { label: "Racing",                          url: "/loader.php?sid=racing" },
    { label: "Factions",                        url: "/factions.php" },
    { label: "Faction Warfare",                 url: "/page.php?sid=factionWarfare" },
    { label: "Jobs",                            url: "/jobs.php" },
    { label: "Job List",                        url: "/joblist.php" },
    { label: "Job Listing",                     url: "/joblisting.php" },
    { label: "Companies",                       url: "/companies.php" },
    { label: "Education",                       url: "/education.php" },
    { label: "Gym",                             url: "/gym.php" },
    { label: "Travel",                          url: "/page.php?sid=travel" },
    { label: "Hospital",                        url: "/hospitalview.php" },
    { label: "Jail",                            url: "/jailview.php" },
    { label: "Friends List",                    url: "/page.php?sid=list&type=friends" },
    { label: "Enemies List",                    url: "/page.php?sid=list&type=enemies" },
    { label: "Targets List",                    url: "/page.php?sid=list&type=targets" },
    { label: "Messages",                        url: "/messages.php" },
    { label: "Message Inc",                     url: "/messageinc.php" },
    { label: "Fans",                            url: "/fans.php" },
    { label: "Personals",                       url: "/personals.php" },
    { label: "Forums",                          url: "/forums.php" },
    { label: "Newspaper",                       url: "/newspaper.php" },
    { label: "Comics",                          url: "/comics.php" },
    { label: "Archives",                        url: "/archives.php" },
    { label: "Rules",                           url: "/rules.php" },
    { label: "Staff",                           url: "/staff.php" },
    { label: "Credits",                         url: "/credits.php" },
    { label: "Committee",                       url: "/committee.php" },
    { label: "Calendar",                        url: "/calendar.php" },
    { label: "Competition",                     url: "/competition.php" },
    { label: "Church",                          url: "/church.php" },
    { label: "Blacklist",                       url: "/blacklist.php" },
    { label: "Christmas Town",                  url: "/christmas_town.php" },
    { label: "Classified Ads",                  url: "/newspaper_class.php" },
    { label: "Gallery",                         url: "/page.php?sid=gallery" },
    { label: "Chain Report",                    url: "/war.php?step=chainreport" },
    { label: "War Report",                      url: "/war.php?step=warreport" },
    { label: "Rank Report",                     url: "/war.php?step=rankreport" },
    { label: "Raid Report",                     url: "/war.php?step=raidreport" },
    { label: "Church Proposals",                url: "/church.php?step=proposals" },
    { label: "Slots Stats",                     url: "/page.php?sid=slotsStats" },
    { label: "Slots Last Rolls",                url: "/page.php?sid=slotsLastRolls" },
    { label: "Roulette Stats",                  url: "/page.php?sid=rouletteStatistics" },
    { label: "Roulette Last Spins",             url: "/page.php?sid=rouletteLastSpins" },
    { label: "High/Low Stats",                  url: "/page.php?sid=highlowStats" },
    { label: "High/Low Last Games",             url: "/page.php?sid=highlowLastGames" },
    { label: "Keno Stats",                      url: "/page.php?sid=kenoStatistics" },
    { label: "Keno Last Games",                 url: "/page.php?sid=kenoLastGames" },
    { label: "Craps Stats",                     url: "/page.php?sid=crapsStats" },
    { label: "Craps Last Rolls",                url: "/page.php?sid=crapsLastRolls" },
    { label: "Blackjack Stats",                 url: "/page.php?sid=blackjackStatistics" },
    { label: "Blackjack Last Games",             url: "/page.php?sid=blackjackLastGames" },
    { label: "Hold'em Stats",                   url: "/page.php?sid=holdemStats" },
    { label: "RR Stats",                        url: "/page.php?sid=russianRouletteStatistics" },
    { label: "RR Last Games",                   url: "/page.php?sid=russianRouletteLastGames" },
    { label: "Lottery Bought",                  url: "/page.php?sid=lotteryTicketsBought" },
    { label: "Lottery Winners",                 url: "/page.php?sid=lotteryPreviousWinners" },
    { label: "Player Bazaar",                   url: "/bazaar.php?userId=1" },
    { label: "Wheel Last Spins",                url: "/page.php?sid=spinTheWheelLastSpins" }
];

function loadState() {
    try {
        const raw = GM_getValue(CFG.storageKey, null);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}

function saveState(state) {
    try { GM_setValue(CFG.storageKey, JSON.stringify(state)); } catch {}
}

const state = Object.assign({
    idx:       0,
    panelX:    null,
    panelY:    null,
    pillX:     null,
    pillY:     null,
    collapsed: false,
    hidden:    false,
    eggsFound: 0,
    visited:   [],
    filter:    '',
    boomerMode: false
}, loadState());

function persist() { saveState(state); }

GM_addStyle(`
#ueeh-panel, #ueeh-panel * {
    box-sizing: border-box;
    font-family: 'Segoe UI', system-ui, sans-serif;
    line-height: 1.4;
}
#ueeh-panel {
    position: fixed;
    z-index: 2147483647;
    width: 250px;
    border-radius: 14px;
    overflow: hidden;
    box-shadow:
        0 0 0 1px rgba(255,200,50,0.18),
        0 8px 40px rgba(0,0,0,0.55),
        0 2px 8px rgba(0,0,0,0.4);
    backdrop-filter: blur(12px) saturate(1.4);
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
    background: linear-gradient(160deg, rgba(28,24,18,0.95) 0%, rgba(22,19,14,0.95) 100%);
    border: 1px solid rgba(255,200,50,0.22);
    transition: box-shadow 0.2s;
    user-select: none;
    will-change: transform, opacity;
}
#ueeh-panel.ueeh-egg-glow {
    box-shadow:
        0 0 0 2px rgba(255,215,0,0.7),
        0 0 28px 6px rgba(255,200,50,0.45),
        0 8px 40px rgba(0,0,0,0.55);
    animation: ueeh-pulse 0.8s ease-in-out 3;
}
@keyframes ueeh-pulse {
    0%,100% { box-shadow: 0 0 0 2px rgba(255,215,0,0.7), 0 0 28px 6px rgba(255,200,50,0.45), 0 8px 40px rgba(0,0,0,0.55); }
    50%      { box-shadow: 0 0 0 3px rgba(255,215,0,1),   0 0 50px 14px rgba(255,200,50,0.7), 0 8px 40px rgba(0,0,0,0.55); }
}
#ueeh-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 10px 10px 9px;
    cursor: grab;
    background: linear-gradient(90deg, rgba(255,200,50,0.12) 0%, rgba(255,170,30,0.06) 100%);
    border-bottom: 1px solid rgba(255,200,50,0.15);
}
#ueeh-header:active { cursor: grabbing; }
#ueeh-egg-icon {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 0 5px rgba(255,210,60,0.6));
    animation: ueeh-bob 3s ease-in-out infinite;
}
@keyframes ueeh-bob {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-2px); }
}
#ueeh-title {
    flex: 1;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #f5d060;
    text-shadow: 0 1px 8px rgba(255,200,50,0.4);
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#ueeh-egg-badge {
    font-size: 10px;
    font-weight: 800;
    background: linear-gradient(135deg, #f5a623, #e8691e);
    color: #fff;
    border-radius: 10px;
    padding: 1px 7px;
    letter-spacing: 0.04em;
    box-shadow: 0 1px 6px rgba(232,105,30,0.4);
    min-width: 28px;
    text-align: center;
}
.ueeh-hdr-btn {
    width: 20px;
    height: 20px;
    border: none;
    background: rgba(255,255,255,0.07);
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
    flex-shrink: 0;
    padding: 0;
    transition: background 0.15s, color 0.15s;
}
.ueeh-hdr-btn:hover {
    background: rgba(255,200,50,0.18);
    color: #f5d060;
}
#ueeh-panel:not(.collapsed) #ueeh-hdr-support {
    display: none;
}
#ueeh-action-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 5px 12px;
    background: rgba(0,0,0,0.15);
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.ueeh-action-btn {
    width: 26px;
    height: 26px;
    border: none;
    background: rgba(255,255,255,0.07);
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    transition: all 0.15s;
    flex-shrink: 0;
}
.ueeh-action-btn:hover {
    background: rgba(255,200,50,0.18);
    color: #f5d060;
    transform: translateY(-1px);
}
.ueeh-action-btn:active {
    transform: scale(0.9);
}
#ueeh-mini-btn {
    position: fixed;
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #1c1809 0%, #2a2010 100%);
    border: 1px solid rgba(255,200,50,0.45);
    border-radius: 50%;
    cursor: pointer;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.5), 0 0 10px rgba(255,200,50,0.2);
    transition: transform 0.2s, box-shadow 0.2s;
    touch-action: none;
}
#ueeh-mini-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(0,0,0,0.6), 0 0 15px rgba(255,200,50,0.4);
}
#ueeh-body {
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
    transition: max-height 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease;
    max-height: 440px;
    opacity: 1;
}
#ueeh-panel.collapsed #ueeh-body {
    max-height: 0;
    opacity: 0;
}
#ueeh-panel.collapsed #ueeh-controls {
    border-top-color: transparent;
}
#ueeh-progress-wrap {
    padding: 8px 12px 6px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
}
#ueeh-progress-track {
    height: 4px;
    border-radius: 2px;
    background: rgba(255,255,255,0.1);
    overflow: hidden;
    margin-bottom: 4px;
}
#ueeh-progress-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, #f5a623, #f5d060);
    transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 0 8px rgba(245,166,35,0.5);
}
#ueeh-progress-label {
    font-size: 10px;
    color: rgba(255,255,255,0.4);
    display: flex;
    justify-content: space-between;
}
#ueeh-progress-label span { color: rgba(255,200,50,0.8); }
#ueeh-current-page {
    padding: 6px 12px;
    font-size: 10px;
    color: rgba(255,255,255,0.35);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#ueeh-current-page em {
    font-style: normal;
    color: rgba(255,200,50,0.7);
}
#ueeh-search-wrap {
    padding: 7px 10px 5px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
}
#ueeh-search {
    width: 100%;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 7px;
    padding: 5px 9px;
    font-size: 11px;
    color: #fff;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
}
#ueeh-search::placeholder { color: rgba(255,255,255,0.28); }
#ueeh-search:focus {
    border-color: rgba(245,166,35,0.5);
    background: rgba(255,255,255,0.1);
}
#ueeh-list-wrap {
    max-height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 4px 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(245,166,35,0.3) transparent;
}
#ueeh-list-wrap::-webkit-scrollbar      { width: 4px; }
#ueeh-list-wrap::-webkit-scrollbar-track { background: transparent; }
#ueeh-list-wrap::-webkit-scrollbar-thumb {
    background: rgba(245,166,35,0.3);
    border-radius: 2px;
}
.ueeh-page-item {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px;
    cursor: pointer;
    transition: background 0.12s;
    font-size: 11px;
    color: rgba(255,255,255,0.75);
    text-decoration: none;
}
.ueeh-page-item:hover {
    background: rgba(255,200,50,0.1);
    color: #fff;
}
.ueeh-page-item.ueeh-active {
    background: rgba(245,166,35,0.2);
    color: #f5d060;
    font-weight: 600;
}
.ueeh-page-item.ueeh-visited .ueeh-check { opacity: 1; color: #4caf50; }
.ueeh-page-num {
    font-size: 9px;
    color: rgba(255,255,255,0.22);
    min-width: 24px;
    text-align: right;
    flex-shrink: 0;
}
.ueeh-page-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ueeh-page-overseas {
    font-size: 8px;
    color: #e8691e;
    border: 1px solid #e8691e;
    border-radius: 4px;
    padding: 1px 4px;
    flex-shrink: 0;
}
.ueeh-check {
    font-size: 10px;
    opacity: 0.15;
    color: #fff;
    flex-shrink: 0;
}
#ueeh-controls-expanded {
    padding: 8px 10px;
    display: flex;
    gap: 6px;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.07);
}
#ueeh-panel.collapsed #ueeh-controls-expanded { display: none; }
.ueeh-btn {
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
    padding: 7px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s, filter 0.15s, background 0.15s;
    outline: none;
    position: relative;
    overflow: hidden;
}
.ueeh-btn:active { transform: scale(0.93); }
.ueeh-btn-prev {
    width: 32px;
    height: 32px;
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.6);
    flex-shrink: 0;
    padding: 0;
    font-size: 14px;
}
.ueeh-btn-prev:hover {
    background: rgba(255,255,255,0.14);
    color: #fff;
}
.ueeh-btn-next-exp {
    flex: 1;
    height: 32px;
    background: linear-gradient(135deg, #f5a623 0%, #e8691e 100%);
    color: #fff;
    letter-spacing: 0.05em;
    font-size: 11px;
    box-shadow: 0 2px 12px rgba(245,166,35,0.35);
    text-transform: uppercase;
}
.ueeh-btn-next-exp:hover {
    filter: brightness(1.12);
    box-shadow: 0 3px 18px rgba(245,166,35,0.5);
}
#ueeh-controls-compact {
    padding: 8px 10px;
    display: none;
    gap: 10px;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.07);
    background: rgba(0,0,0,0.2);
    border-radius: 0 0 13px 13px;
}
#ueeh-panel.collapsed #ueeh-controls-compact { display: flex; }
.ueeh-nav-btns { display: flex; gap: 5px; }
.ueeh-nav-btn {
    width: 34px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    transition: all 0.15s;
    flex-shrink: 0;
}
.ueeh-nav-btn:hover { background: rgba(245,166,35,0.2); color: #f5d060; }
.ueeh-nav-btn:active { transform: scale(0.9); }
.ueeh-btn-next-cmp {
    background: linear-gradient(135deg, #f5a623 0%, #e8691e 100%);
    color: #fff;
    box-shadow: 0 2px 8px rgba(245,166,35,0.25);
}
.ueeh-btn-next-cmp:hover { filter: brightness(1.15); color: #fff; box-shadow: 0 3px 12px rgba(245,166,35,0.4); }
#ueeh-nav-core {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    overflow: hidden;
}
#ueeh-nav-stats {
    display: flex;
    justify-content: space-between;
    font-size: 9.5px;
    color: rgba(255,255,255,0.5);
    white-space: nowrap;
}
#ueeh-nav-stats span { color: rgba(255,200,50,0.9); font-weight: 600; }
#ueeh-nav-track {
    height: 4px;
    border-radius: 2px;
    background: rgba(255,255,255,0.1);
    overflow: hidden;
    width: 100%;
}
#ueeh-nav-fill {
    height: 100%;
    background: linear-gradient(90deg, #f5a623, #f5d060);
    width: 0%;
    transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 0 5px rgba(245,166,35,0.4);
}
#ueeh-jump-row {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 10px 9px;
}
#ueeh-jump-row label {
    font-size: 10px;
    color: rgba(255,255,255,0.3);
    flex-shrink: 0;
}
#ueeh-jump-input {
    width: 52px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    padding: 4px 6px;
    font-size: 11px;
    color: #fff;
    outline: none;
    text-align: center;
    -moz-appearance: textfield;
}
#ueeh-jump-input::-webkit-inner-spin-button,
#ueeh-jump-input::-webkit-outer-spin-button { -webkit-appearance: none; }
#ueeh-jump-input:focus { border-color: rgba(245,166,35,0.5); }
#ueeh-jump-total {
    font-size: 10px;
    color: rgba(255,255,255,0.25);
    flex-shrink: 0;
}
#ueeh-jump-go {
    flex: 1;
    padding: 4px 8px;
    height: 26px;
    font-size: 10px;
    background: rgba(245,166,35,0.2);
    color: #f5d060;
    border: 1px solid rgba(245,166,35,0.25);
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
    transition: background 0.15s;
    letter-spacing: 0.04em;
}
#ueeh-jump-go:hover { background: rgba(245,166,35,0.35); }
#ueeh-footer {
    padding: 6px 10px;
    text-align: center;
    font-size: 9px;
    color: rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(0, 0, 0, 0.2);
    letter-spacing: 0.03em;
}
#ueeh-footer a {
    color: rgba(245, 166, 35, 0.8);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.15s;
}
#ueeh-footer a:hover {
    color: #f5d060;
}
#ueeh-toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(80px);
    z-index: 2147483647;
    background: linear-gradient(135deg, #1c1809 0%, #2a2010 100%);
    border: 1px solid rgba(255,200,50,0.45);
    border-radius: 14px;
    padding: 12px 20px 12px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 30px rgba(0,0,0,0.6), 0 0 20px rgba(255,200,50,0.2);
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease;
    opacity: 0;
    pointer-events: none;
    max-width: 90vw;
}
#ueeh-toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
    pointer-events: auto;
}
#ueeh-toast-icon {
    font-size: 28px;
    animation: ueeh-wobble 0.5s ease-out 0.1s both;
    flex-shrink: 0;
    filter: drop-shadow(0 0 8px rgba(255,200,50,0.7));
}
@keyframes ueeh-wobble {
    0%   { transform: rotate(-15deg) scale(0.7); }
    50%  { transform: rotate(8deg)  scale(1.15); }
    100% { transform: rotate(0deg)  scale(1); }
}
#ueeh-toast-text { flex: 1; }
#ueeh-toast-title {
    font-size: 13px;
    font-weight: 800;
    color: #f5d060;
    text-shadow: 0 1px 8px rgba(255,200,50,0.4);
}
#ueeh-toast-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.55);
    margin-top: 2px;
}
#ueeh-toast-close {
    background: none;
    border: none;
    color: rgba(255,255,255,0.4);
    font-size: 16px;
    cursor: pointer;
    padding: 0 2px;
    line-height: 1;
    flex-shrink: 0;
    transition: color 0.15s;
}
#ueeh-toast-close:hover { color: rgba(255,255,255,0.9); }
#easter-egg-hunt-root button.__ueeh-repositioned {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: min(55vw, 55vh) !important;
    height: min(55vw, 55vh) !important;
    z-index: 2147483640 !important;
    cursor: pointer !important;
    border: 3px solid rgba(255,215,0,0.85) !important;
    border-radius: 50% !important;
    box-shadow: 0 0 0 6px rgba(255,215,0,0.18),
                0 0 40px 10px rgba(255,200,50,0.4) !important;
    animation: ueeh-egg-appear 0.4s cubic-bezier(0.34,1.56,0.64,1) both !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: visible !important;
    background: transparent !important;
}
@keyframes ueeh-egg-appear {
    from { transform: translate(-50%,-50%) scale(0.4) rotate(-8deg); opacity: 0; }
    to   { transform: translate(-50%,-50%) scale(1)   rotate(0deg);  opacity: 1; }
}
#easter-egg-hunt-root button.__ueeh-repositioned img,
#easter-egg-hunt-root button.__ueeh-repositioned > *:first-child {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
}

/* =========================================================
   🥔 HATER / BOOMER MODE (Windows XP Theme) 🥔
   ========================================================= */
#ueeh-panel.ueeh-boomer-mode {
    background: #ECE9D8;
    border: 1px solid #0054E3;
    border-radius: 4px 4px 0 0;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-header {
    background: linear-gradient(180deg, #0058e6 0%, #3a93ff 8%, #288eff 40%, #127dff 88%, #036bfe 100%);
    border-bottom: 1px solid #003C9D;
    border-radius: 3px 3px 0 0;
    padding: 5px;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-title {
    color: #FFF;
    text-shadow: 1px 1px 1px #000;
    font-family: 'Trebuchet MS', Tahoma, sans-serif;
    font-weight: bold;
}
#ueeh-panel.ueeh-boomer-mode * {
    font-family: Tahoma, 'Trebuchet MS', sans-serif !important;
    color: #000;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-hdr-btn {
    background: #ECE9D8;
    border: 1px outset #FFF;
    color: #000;
    border-radius: 2px;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-hdr-btn:active {
    border: 1px inset #FFF;
    background: #D4D0C8;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-egg-badge {
    background: #FFF;
    color: #000;
    border: 1px inset #ACA899;
    box-shadow: none;
    border-radius: 0;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-action-row {
    background: #ECE9D8;
    border-bottom: 1px solid #ACA899;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-action-btn {
    background: #ECE9D8;
    border: 1px outset #FFF;
    color: #000;
    border-radius: 2px;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-action-btn:active {
    border: 1px inset #FFF;
    background: #D4D0C8;
    transform: none;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-progress-wrap,
#ueeh-panel.ueeh-boomer-mode #ueeh-current-page,
#ueeh-panel.ueeh-boomer-mode #ueeh-search-wrap,
#ueeh-panel.ueeh-boomer-mode #ueeh-controls-expanded,
#ueeh-panel.ueeh-boomer-mode #ueeh-controls-compact,
#ueeh-panel.ueeh-boomer-mode #ueeh-footer {
    border-color: #ACA899;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-search {
    background: #FFF;
    border: 1px inset #7F9DB9;
    color: #000;
    border-radius: 0;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-page-item { color: #000; }
#ueeh-panel.ueeh-boomer-mode .ueeh-page-item:hover {
    background: #316AC5;
    color: #FFF;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-page-item:hover * { color: #FFF; }
#ueeh-panel.ueeh-boomer-mode .ueeh-page-item.ueeh-active {
    background: #000080;
    color: #FFF;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-page-item.ueeh-active * { color: #FFF; }
#ueeh-panel.ueeh-boomer-mode .ueeh-btn,
#ueeh-panel.ueeh-boomer-mode .ueeh-nav-btn,
#ueeh-panel.ueeh-boomer-mode #ueeh-jump-go {
    background: #ECE9D8;
    border: 2px outset #FFF;
    color: #000;
    border-radius: 3px;
    box-shadow: none;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-btn:active,
#ueeh-panel.ueeh-boomer-mode .ueeh-nav-btn:active,
#ueeh-panel.ueeh-boomer-mode #ueeh-jump-go:active {
    border: 2px inset #FFF;
    background: #D4D0C8;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-progress-track,
#ueeh-panel.ueeh-boomer-mode #ueeh-nav-track {
    background: #FFF;
    border: 1px inset #ACA899;
    border-radius: 0;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-progress-fill,
#ueeh-panel.ueeh-boomer-mode #ueeh-nav-fill {
    background: linear-gradient(180deg, #28E12A 0%, #15B816 100%);
    box-shadow: none;
    border-radius: 0;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-progress-label span,
#ueeh-panel.ueeh-boomer-mode #ueeh-current-page em,
#ueeh-panel.ueeh-boomer-mode #ueeh-nav-stats span,
#ueeh-panel.ueeh-boomer-mode #ueeh-jump-total {
    color: #000;
    font-weight: bold;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-page-overseas {
    border-color: #000;
    color: #000;
}
#ueeh-panel.ueeh-boomer-mode .ueeh-check { color: #000; }
#ueeh-panel.ueeh-boomer-mode .ueeh-page-item.ueeh-visited .ueeh-check {
    opacity: 1;
    color: #15B816 !important;
    font-weight: bold;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-jump-input {
    background: #FFF;
    border: 1px inset #7F9DB9;
    color: #000;
    border-radius: 0;
}
#ueeh-panel.ueeh-boomer-mode #ueeh-controls-compact { background: #ECE9D8; }
#ueeh-panel.ueeh-boomer-mode #ueeh-footer a {
    color: #0000EE;
    text-decoration: underline;
}
#ueeh-toast.ueeh-boomer-mode {
    background: #FFFFCC;
    border: 1px solid #000;
    border-radius: 0;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
    color: #000;
}
#ueeh-toast.ueeh-boomer-mode * {
    color: #000 !important;
    text-shadow: none !important;
    font-family: Tahoma, sans-serif !important;
}
#ueeh-mini-btn.ueeh-boomer-mode {
    background: #ECE9D8;
    border: 2px outset #FFF;
    border-radius: 4px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
}
#ueeh-mini-btn.ueeh-boomer-mode:hover {
    transform: none;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    filter: brightness(1.05);
}
#ueeh-mini-btn.ueeh-boomer-mode:active {
    border: 2px inset #FFF;
    background: #D4D0C8;
}

@media (max-width: 768px) {
    #ueeh-panel {
        width: 240px;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background: #1c1809;
    }
    #ueeh-list-wrap { max-height: 130px; }
    #ueeh-toast { bottom: 12px; }
    #ueeh-toast-icon { font-size: 22px; }
}
`);

let panel, listWrap, progressFill, progressLabel, navProgFill, navStats,
    jumpInput, searchInput, currentPageEl, eggBadge;
let miniBtn;

function applyHiddenState() {
    if (state.hidden) {
        panel.style.display = 'none';
        if (!miniBtn) {
            miniBtn = document.createElement('button');
            miniBtn.id = 'ueeh-mini-btn';
            miniBtn.innerHTML = '🥚';
            miniBtn.title = 'Show Panel';
            document.body.appendChild(miniBtn);
            makePillDraggable(miniBtn);
            if (state.boomerMode) {
                miniBtn.classList.add('ueeh-boomer-mode');
            }
        }
        miniBtn.style.display = 'flex';

        const defaultPillX = window.innerWidth - 60;
        const defaultPillY = window.innerHeight - 100;
        const px = clamp(state.pillX ?? defaultPillX, 0, window.innerWidth - 44);
        const py = clamp(state.pillY ?? defaultPillY, 0, window.innerHeight - 44);

        miniBtn.style.left = px + 'px';
        miniBtn.style.top = py + 'px';
        miniBtn.style.bottom = 'auto';
        miniBtn.style.right = 'auto';
    } else {
        panel.style.display = '';
        if (miniBtn) miniBtn.style.display = 'none';
    }
}

function applyBoomerMode() {
    if (state.boomerMode) {
        if (panel) panel.classList.add('ueeh-boomer-mode');
        if (toastEl) toastEl.classList.add('ueeh-boomer-mode');
        if (miniBtn) miniBtn.classList.add('ueeh-boomer-mode');
    } else {
        if (panel) panel.classList.remove('ueeh-boomer-mode');
        if (toastEl) toastEl.classList.remove('ueeh-boomer-mode');
        if (miniBtn) miniBtn.classList.remove('ueeh-boomer-mode');
    }
}

function buildPanel() {
    panel = document.createElement('div');
    panel.id = 'ueeh-panel';
    if (state.collapsed) panel.classList.add('collapsed');

    const defaultX = window.innerWidth - 260;
    const defaultY = 16;
    panel.style.left = clamp(state.panelX ?? defaultX, 0, window.innerWidth  - 244) + 'px';
    panel.style.top  = clamp(state.panelY ?? defaultY, 0, window.innerHeight - 80)  + 'px';

    const header = document.createElement('div');
    header.id = 'ueeh-header';

    const eggIcon = document.createElement('div');
    eggIcon.id = 'ueeh-egg-icon';
    eggIcon.innerHTML = EGG_SVG;

    const title = document.createElement('div');
    title.id = 'ueeh-title';
    title.textContent = 'Egg Hunter';

    eggBadge = document.createElement('div');
    eggBadge.id = 'ueeh-egg-badge';
    eggBadge.textContent = '🥚 ' + state.eggsFound;

    const supportBtnCompact = document.createElement('button');
    supportBtnCompact.id = 'ueeh-hdr-support';
    supportBtnCompact.className = 'ueeh-hdr-btn';
    supportBtnCompact.innerHTML = '💬';
    supportBtnCompact.title = 'Official Forum Thread';
    supportBtnCompact.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open('https://www.torn.com/forums.php#/p=threads&f=67&t=16552267&b=0&a=0', '_blank');
    });

    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'ueeh-hdr-btn';
    collapseBtn.innerHTML = state.collapsed ? '▲' : '▼';
    collapseBtn.title = 'Collapse / Expand';
    collapseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.collapsed = !state.collapsed;
        panel.classList.toggle('collapsed', state.collapsed);
        collapseBtn.innerHTML = state.collapsed ? '▲' : '▼';
        persist();
    });

    const hideBtn = document.createElement('button');
    hideBtn.className = 'ueeh-hdr-btn';
    hideBtn.innerHTML = '✕';
    hideBtn.title = 'Hide Panel';
    hideBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.hidden = true;
        persist();
        applyHiddenState();
    });

    header.append(eggIcon, title, eggBadge, supportBtnCompact, collapseBtn, hideBtn);

    const body = document.createElement('div');
    body.id = 'ueeh-body';

    const actionRow = document.createElement('div');
    actionRow.id = 'ueeh-action-row';

    const boomerBtn = document.createElement('button');
    boomerBtn.className = 'ueeh-action-btn';
    boomerBtn.innerHTML = '🥔';
    boomerBtn.title = 'Boomer Mode';
    boomerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!state.boomerMode) {
            if (confirm("I am an old grandpa and an AI hater who dislikes modern UI appearances. Please give me the potato theme.")) {
                state.boomerMode = true;
                persist();
                applyBoomerMode();
            }
        } else {
            state.boomerMode = false;
            persist();
            applyBoomerMode();
        }
    });

    const resetEggsBtn = document.createElement('button');
    resetEggsBtn.className = 'ueeh-action-btn';
    resetEggsBtn.innerHTML = '🗑️';
    resetEggsBtn.title = 'Clear Eggs Found';
    resetEggsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Clear eggs found counter?')) {
            state.eggsFound = 0;
            eggBadge.textContent = '🥚 ' + state.eggsFound;
            persist();
        }
    });

    const resetBtn = document.createElement('button');
    resetBtn.className = 'ueeh-action-btn';
    resetBtn.innerHTML = '↺';
    resetBtn.title = 'Reset Checkpoints';
    resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Reset all visited checkpoints?')) {
            state.visited = [];
            state.idx = 0;
            persist();
            renderList(false);
            updateUI();
        }
    });

    const supportBtnMain = document.createElement('button');
    supportBtnMain.className = 'ueeh-action-btn';
    supportBtnMain.innerHTML = '💬';
    supportBtnMain.title = 'Official Forum Thread';
    supportBtnMain.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open('https://www.torn.com/forums.php#/p=threads&f=67&t=16552267&b=0&a=0', '_blank');
    });

    actionRow.append(boomerBtn, resetEggsBtn, resetBtn, supportBtnMain);

    const progWrap = document.createElement('div');
    progWrap.id = 'ueeh-progress-wrap';
    progressFill = document.createElement('div');
    progressFill.id = 'ueeh-progress-fill';
    const progTrack = document.createElement('div');
    progTrack.id = 'ueeh-progress-track';
    progTrack.appendChild(progressFill);
    progressLabel = document.createElement('div');
    progressLabel.id = 'ueeh-progress-label';
    progWrap.append(progTrack, progressLabel);

    currentPageEl = document.createElement('div');
    currentPageEl.id = 'ueeh-current-page';

    const searchWrap = document.createElement('div');
    searchWrap.id = 'ueeh-search-wrap';
    searchInput = document.createElement('input');
    searchInput.id = 'ueeh-search';
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 Search pages…';
    searchInput.value = state.filter || '';
    searchInput.addEventListener('input', () => {
        state.filter = searchInput.value;
        renderList(false);
    });
    searchWrap.appendChild(searchInput);

    listWrap = document.createElement('div');
    listWrap.id = 'ueeh-list-wrap';

    const jumpRow = document.createElement('div');
    jumpRow.id = 'ueeh-jump-row';
    const jumpLabel = document.createElement('label');
    jumpLabel.textContent = 'Jump:';
    jumpInput = document.createElement('input');
    jumpInput.id = 'ueeh-jump-input';
    jumpInput.type = 'number';
    jumpInput.min = '1';
    jumpInput.max = String(PAGES.length);
    jumpInput.value = String(state.idx + 1);
    const jumpTotal = document.createElement('span');
    jumpTotal.id = 'ueeh-jump-total';
    jumpTotal.textContent = '/ ' + PAGES.length;
    const jumpGo = document.createElement('button');
    jumpGo.id = 'ueeh-jump-go';
    jumpGo.textContent = 'GO';
    jumpGo.addEventListener('click', (e) => {
        e.stopPropagation();
        const v = parseInt(jumpInput.value, 10) - 1;
        if (!isNaN(v) && v >= 0 && v < PAGES.length) {
            navigateTo(v);
        }
    });
    jumpInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') jumpGo.click();
        e.stopPropagation();
    });

    jumpRow.append(jumpLabel, jumpInput, jumpTotal, jumpGo);

    const footer = document.createElement('div');
    footer.id = 'ueeh-footer';
    footer.innerHTML = 'Developed by <a href="https://www.torn.com/profiles.php?XID=4141121" target="_blank">sercann [4141121]</a>';

    body.append(actionRow, progWrap, currentPageEl, searchWrap, listWrap, jumpRow, footer);

    /* --- EXPANDED CONTROLS --- */
    const controlsExpanded = document.createElement('div');
    controlsExpanded.id = 'ueeh-controls-expanded';

    const prevBtnE = document.createElement('button');
    prevBtnE.className = 'ueeh-btn ueeh-btn-prev';
    prevBtnE.innerHTML = '◀';
    prevBtnE.title = 'Previous Page';
    prevBtnE.addEventListener('click', (e) => { e.stopPropagation(); navigateDelta(-1); });

    const nextBtnE = document.createElement('button');
    nextBtnE.className = 'ueeh-btn ueeh-btn-next-exp';
    nextBtnE.textContent = 'Next Page ▶';
    nextBtnE.title = 'Go to next page (Shortcut: Alt+Right)';
    nextBtnE.addEventListener('click', (e) => { e.stopPropagation(); navigateDelta(1); });

    controlsExpanded.append(prevBtnE, nextBtnE);

    /* --- COMPACT CONTROLS --- */
    const controlsCompact = document.createElement('div');
    controlsCompact.id = 'ueeh-controls-compact';

    const navBtns = document.createElement('div');
    navBtns.className = 'ueeh-nav-btns';

    const prevBtnC = document.createElement('button');
    prevBtnC.className = 'ueeh-nav-btn';
    prevBtnC.innerHTML = '◀';
    prevBtnC.title = 'Previous Page';
    prevBtnC.addEventListener('click', (e) => { e.stopPropagation(); navigateDelta(-1); });

    const nextBtnC = document.createElement('button');
    nextBtnC.className = 'ueeh-nav-btn ueeh-btn-next-cmp';
    nextBtnC.innerHTML = '▶';
    nextBtnC.title = 'Next Page (Alt+Right)';
    nextBtnC.addEventListener('click', (e) => { e.stopPropagation(); navigateDelta(1); });

    navBtns.append(prevBtnC, nextBtnC);

    const navCore = document.createElement('div');
    navCore.id = 'ueeh-nav-core';

    navStats = document.createElement('div');
    navStats.id = 'ueeh-nav-stats';

    const navTrack = document.createElement('div');
    navTrack.id = 'ueeh-nav-track';

    navProgFill = document.createElement('div');
    navProgFill.id = 'ueeh-nav-fill';

    navTrack.appendChild(navProgFill);
    navCore.append(navStats, navTrack);

    controlsCompact.append(navBtns, navCore);

    panel.append(header, body, controlsExpanded, controlsCompact);
    document.body.appendChild(panel);

    makeDraggable(header, panel);
    updateUI();
    renderList(false);
    applyHiddenState();
    applyBoomerMode();

    document.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); navigateDelta(1); }
        if (e.altKey && e.key === 'ArrowLeft')  { e.preventDefault(); navigateDelta(-1); }
    });
}

function renderList(scrollToActive = false) {
    const q = (state.filter || '').toLowerCase();
    listWrap.innerHTML = '';
    const visitedSet = new Set(state.visited || []);

    PAGES.forEach((p, i) => {
        if (q && !p.label.toLowerCase().includes(q) && !p.url.toLowerCase().includes(q)) return;
        const el = document.createElement('a');
        el.className = 'ueeh-page-item';
        if (i === state.idx) el.classList.add('ueeh-active');
        if (visitedSet.has(i)) el.classList.add('ueeh-visited');
        el.href = 'https://www.torn.com' + p.url;
        el.draggable = false;
        el.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(i);
        });

        const num = document.createElement('span');
        num.className = 'ueeh-page-num';
        num.textContent = i + 1;

        const lbl = document.createElement('span');
        lbl.className = 'ueeh-page-label';
        lbl.textContent = p.label;

        el.append(num, lbl);

        if (p.overseas) {
            const tag = document.createElement('span');
            tag.className = 'ueeh-page-overseas';
            tag.textContent = 'OVERSEAS';
            el.appendChild(tag);
        }

        const chk = document.createElement('span');
        chk.className = 'ueeh-check';
        chk.textContent = '✓';
        el.appendChild(chk);

        listWrap.appendChild(el);
    });

    if (scrollToActive) {
        const active = listWrap.querySelector('.ueeh-active');
        if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

function navigateDelta(delta) {
    let next = state.idx + delta;
    if (next >= PAGES.length) next = 0;
    if (next < 0) next = PAGES.length - 1;
    navigateTo(next);
}

function navigateTo(idx) {
    state.idx = idx;
    if (!state.visited) state.visited = [];
    if (!state.visited.includes(idx)) state.visited.push(idx);
    persist();

    const targetUrl = 'https://www.torn.com' + PAGES[idx].url;
    const currentBase = window.location.href.split('#')[0];
    const targetBase = targetUrl.split('#')[0];

    if (currentBase === targetBase) {
        window.location.reload();
    } else {
        window.location.href = targetUrl;
    }
}

function updateUI() {
    const visited = (state.visited || []).length;
    const pct = (visited / PAGES.length * 100).toFixed(1);
    const left = PAGES.length - visited;

    if (progressFill) progressFill.style.width = pct + '%';
    if (progressLabel) {
        progressLabel.innerHTML = `<span>${visited}</span> pages visited &nbsp; <span>${pct}%</span>`;
    }

    if (navProgFill) navProgFill.style.width = pct + '%';
    if (navStats) {
        navStats.innerHTML = `<span>Pg: ${state.idx + 1}/${PAGES.length}</span><span>Left: ${left}</span><span>${pct}%</span>`;
    }

    if (jumpInput) jumpInput.value = String(state.idx + 1);

    const cur = PAGES[state.idx];
    if (currentPageEl && cur) {
        currentPageEl.innerHTML = `Next: <em>${cur.label}</em>`;
    }
}

function setupEggDetection() {
    const root = document.querySelector(CFG.eggRoot);
    if (!root || root.dataset.ueehHandled) return;
    root.dataset.ueehHandled = '1';

    waitForEggButtons(root).then((buttons) => {
        buttons.forEach((btn) => {
            repositionButton(btn);

            btn.addEventListener('click', function() {
                this.style.pointerEvents = 'none';
                this.style.filter = 'brightness(0.5) grayscale(1)';

                state.eggsFound = (state.eggsFound || 0) + 1;
                if (eggBadge) eggBadge.textContent = '🥚 ' + state.eggsFound;
                persist();
            }, { once: true });
        });

        panel && panel.classList.add('ueeh-egg-glow');
        setTimeout(() => panel && panel.classList.remove('ueeh-egg-glow'), 3000);

        showToast(
            '🥚 Egg Found!',
            'This page has an egg — click it to collect!'
        );
    }).catch(() => {});
}

function waitForEggButtons(root) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject('timeout'), 15000);

        const check = () => {
            const btns = root.querySelectorAll(CFG.eggButton);
            if (btns.length) { clearTimeout(timeout); resolve(btns); }
        };
        check();

        const obs = new MutationObserver(() => {
            const btns = root.querySelectorAll(CFG.eggButton);
            if (btns.length) { obs.disconnect(); clearTimeout(timeout); resolve(btns); }
        });
        obs.observe(root, { childList: true, subtree: true });
    });
}

function repositionButton(btn) {
    if (!btn.classList.contains('__ueeh-repositioned')) {
        btn.classList.add('__ueeh-repositioned');
    }
}

let obsTimer = null;
const pageObserver = new MutationObserver(() => {
    if (obsTimer) return;
    obsTimer = setTimeout(() => {
        obsTimer = null;
        const root = document.querySelector(CFG.eggRoot);
        if (root && !root.dataset.ueehHandled) {
            setupEggDetection();
        }
    }, 150);
});
pageObserver.observe(document.documentElement, { childList: true, subtree: true });

let toastEl;

function buildToast() {
    toastEl = document.createElement('div');
    toastEl.id = 'ueeh-toast';

    const icon = document.createElement('div');
    icon.id = 'ueeh-toast-icon';
    icon.textContent = '🥚';

    const text = document.createElement('div');
    text.id = 'ueeh-toast-text';

    const ttl = document.createElement('div');
    ttl.id = 'ueeh-toast-title';
    const sub = document.createElement('div');
    sub.id = 'ueeh-toast-sub';
    text.append(ttl, sub);

    const close = document.createElement('button');
    close.id = 'ueeh-toast-close';
    close.innerHTML = '✕';
    close.addEventListener('click', hideToast);

    toastEl.append(icon, text, close);
    document.body.appendChild(toastEl);

    applyBoomerMode();
}

let toastTimer;

function showToast(title, subtitle) {
    if (!toastEl) return;
    toastEl.querySelector('#ueeh-toast-title').textContent = title;
    toastEl.querySelector('#ueeh-toast-sub').textContent   = subtitle;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, CFG.notifDuration);
}

function hideToast() {
    toastEl && toastEl.classList.remove('show');
}

function makeDraggable(handle, target) {
    let dragging = false, ox = 0, oy = 0;
    handle.style.touchAction = 'none';

    const start = (cx, cy) => {
        dragging = true;
        const r = target.getBoundingClientRect();
        ox = cx - r.left;
        oy = cy - r.top;
        target.style.transition = 'none';
    };

    const move = (cx, cy) => {
        if (!dragging) return;
        const x = clamp(cx - ox, 0, window.innerWidth  - target.offsetWidth);
        const y = clamp(cy - oy, 0, window.innerHeight - target.offsetHeight);
        target.style.left = x + 'px';
        target.style.top  = y + 'px';
        state.panelX = x;
        state.panelY = y;
    };

    const end = () => {
        if (dragging) { dragging = false; persist(); }
    };

    handle.addEventListener('mousedown',  (e) => { if (e.button === 0) start(e.clientX, e.clientY); });
    document.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));
    document.addEventListener('mouseup',   end);

    handle.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        start(t.clientX, t.clientY);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!dragging) return;
        const t = e.touches[0];
        move(t.clientX, t.clientY);
    }, { passive: true });

    document.addEventListener('touchend', end);
}

function makePillDraggable(target) {
    let dragging = false, moved = false;
    let ox = 0, oy = 0, sx = 0, sy = 0;

    const start = (cx, cy) => {
        dragging = true; moved = false;
        sx = cx; sy = cy;
        const r = target.getBoundingClientRect();
        ox = cx - r.left;
        oy = cy - r.top;
        target.style.transition = 'none';
    };

    const move = (cx, cy, e) => {
        if (!dragging) return;
        if (Math.abs(cx - sx) > 5 || Math.abs(cy - sy) > 5) {
            moved = true;
        }
        if (moved && e && e.cancelable) e.preventDefault();
        const x = clamp(cx - ox, 0, window.innerWidth - target.offsetWidth);
        const y = clamp(cy - oy, 0, window.innerHeight - target.offsetHeight);
        target.style.left = x + 'px';
        target.style.top = y + 'px';
        target.style.bottom = 'auto';
        target.style.right = 'auto';
        state.pillX = x;
        state.pillY = y;
    };

    const end = (e) => {
        if (dragging) {
            dragging = false;
            target.style.transition = 'transform 0.2s, box-shadow 0.2s';
            if (moved) {
                persist();
                if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        }
    };

    target.addEventListener('mousedown', (e) => { if (e.button === 0) start(e.clientX, e.clientY); });
    document.addEventListener('mousemove', (e) => move(e.clientX, e.clientY, e));
    document.addEventListener('mouseup', end);

    target.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        start(t.clientX, t.clientY);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!dragging) return;
        const t = e.touches[0];
        move(t.clientX, t.clientY, e);
    }, { passive: false });

    document.addEventListener('touchend', end);

    target.addEventListener('click', (e) => {
        if (moved) {
            e.stopImmediatePropagation();
            e.preventDefault();
            return;
        }
        state.hidden = false;
        persist();
        applyHiddenState();
    });
}

const EGG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 20" width="20" height="20">
  <defs>
    <linearGradient id="ueeh-egg-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#FFE566"/>
      <stop offset="50%"  stop-color="#FFA726"/>
      <stop offset="100%" stop-color="#E65100"/>
    </linearGradient>
    <filter id="ueeh-egg-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <path fill="url(#ueeh-egg-grad)" filter="url(#ueeh-egg-glow)"
    d="M1.68,16a5.6,5.6,0,0,0,.43.41A5.72,5.72,0,0,0,3,17a4.73,4.73,0,0,0,.74.39,5.08,5.08,0,0,0,.8.3,5.35,5.35,0,0,0,.69.17,8.62,8.62,0,0,0,.87.11h.84a8.46,8.46,0,0,0,.88-.11l.69-.17a7.14,7.14,0,0,0,.81-.31q.38-.18.72-.39a6.57,6.57,0,0,0,.9-.67,5.14,5.14,0,0,0,.41-.4A6.3,6.3,0,0,0,13,11.67a8.86,8.86,0,0,0-.09-1.21c0-.31-.1-.64-.17-1s-.2-.85-.33-1.29-.3-.93-.48-1.39-.33-.81-.51-1.2c-.1-.2-.19-.39-.29-.58L11,4.72c-.18-.33-.4-.69-.64-1s-.4-.55-.62-.82A4.41,4.41,0,0,0,6.5,1,4.41,4.41,0,0,0,3.29,2.86a9.15,9.15,0,0,0-.61.82c-.24.34-.44.68-.62,1L1.87,5l-.33.66c-.16.36-.32.72-.46,1.09S.74,7.7.61,8.16a13.14,13.14,0,0,0-.34,1.3,10,10,0,0,0-.18,1A8.47,8.47,0,0,0,0,11.67a6.29,6.29,0,0,0,.89,3.25A6.63,6.63,0,0,0,1.68,16Z"/>
</svg>`;

const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

win.ueehTestEgg = function() {
    let root = document.querySelector(CFG.eggRoot);
    if (!root) {
        root = document.createElement('div');
        root.id = CFG.eggRoot.replace('#', '');
        document.body.appendChild(root);
    }
    delete root.dataset.ueehHandled;
    const btn = document.createElement(CFG.eggButton);
    const img = document.createElement('img');
    img.src = 'https://www.torn.com/images/items/478/large.png';
    btn.appendChild(img);
    btn.addEventListener('click', function() {
        this.remove();
    });
    root.appendChild(btn);
    setupEggDetection();
};

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function init() {
    if (document.getElementById('ueeh-panel')) return;

    buildToast();
    buildPanel();
    setupEggDetection();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
