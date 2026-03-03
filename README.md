# martian_weather

> a website that shows weather, time and photos from Mars (from Curiosity's REMS). designed and developed by me as a personal portfolio project and an opportunity to learn TypeScript

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://martian-weather-769hslshv-toshas-projects.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-grey?logo=typescript)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)](https://tailwindcss.com)

## goals

- i wanted to create an easy & fast website for portfolio which would also be connected to my hobbies. i am passionate about astrophysics so i decided that **martian_weather** would be perfect, and perfect it was - i got a lot of satisfaction from this project!
- i've been testing my design skills in figma. the purpose of this design was to give off "old" style UI + something game-y. i know it's not perfect, but at some point you gotta stop yourself and **let. it. be.** otherwise there will always be something that you must change, *am i right?*
- this is my first time using typescript and i am one of those who learns by doing, so this was very helpful for me

## challenges
- nasa provides a lot of APIs available for developers, but i met some challenges while trying to acquire what i need. at first, i wanted the website to show current weather right now, like [Mars Explorer](https://psg.gsfc.nasa.gov/apps/mars/), but this website seems to use the **mars climate database (MCD)**, which is a huge scientific database of atmospheric statistics and when i tried to reach it it got kinda messy - the idea was that i would have to build the MCD using Fortran and Python, but for a light project like this it would be too heavy. then i tried to use mcd-helper, but it was not supported on the newest python version and will meet the end of life by the end of 2027. then i went on to see where other people get their mars weather information and only through that (and for some reason not NASA websites!) found this nice api [https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json](https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json) (not really that nice since it gives you tons of info and you cannot really send any params...) but it is what it is and you gotta work with that!

## features

### current features
- latest recieved weather information from Mars REMS station 
- live clock at Curiosity's location and Coordinated Mars Time
- weather charts (temperature, sunrise/sunset, pressure) from different timespans
- latest image from Curiosity and its info

### future features
- map of the rover's location
- more information about Mars for people who don't know much about it
- hover infos over objects to explain, for example, why the weather info is from couple of days before etc.

**i am always learning new stuff so if i did something wrong i would like to know about that and learn from that so i am always open for comments! thanks for checking out my project :)**
