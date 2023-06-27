---
title: "Pokemon PokeDex The Idea"
url: /Programming/PokemonPokedex/Design
date: 2023-07-02
draft: false
tags: ['Pokemon','Pokedex','Design','UML','Backend']
description: ''
---

# Pokemon PokeDex 
For quite some time I have been a big Pokemon fan. The first game I played on my Nintendo DS Lite was Pokemon Diamond and I remember putting so much time into that game collecting all the Pokemon and expanding my underground base as much as I could (that was if I could remember where I had put the thing). Ever since playing that game I have been hooked on the Pokemon franchise and while I couldn't get the games when I was younger I have now completed my collected (totally legally of course). But while I have been playing the games I have never really kept a record of all the different Pokemon I have caught across the games and it took a conversation from one of my friends where I said, and I quote "I just don't know what to do, I am bored" for them to suggest "Why don't you make your own Pokedex?". That initial spark of an idea has now turned into a full plan on how I am going to execute this project.

Now I know something similar has been done before and that is idea isn't exactly original but once the basics of the program have been made I hope to expand it to include certain features that will allow me to track Pokemon across generations and hopefully use it to collect every single Pokemon from every game possible, for now focusing on mainline games.

## Planning
Now I was very close to skippting this step entirely but if you've seen my sneak peek post then you'll recognise the UML diagram below showing that I have roughly planned what I would like to do.

![Pokemon PokeDex UML Entire Program](/images/posts/PokemonPokedex/PokemonPokedexUML.png)

Now this diagram is a bit conviluted and eventually ended up not being the one that I would follow for the first design on the project as I will explain later. But for now it servers as a good launch pad to explain my idea. 

For those of you who have never heard of Pokemon, first of all well done I think it is quite an achievement to have never heard of one of the worlds largest video game franchises and would like to know how you managed it as avoiding spoilers is extremely hard in the modern day. Secondly I am going to explain the basics of the game. Pokemon is a video game world in which small creatures live called Pokemon, humans have managed to invent a way to capture these creatures and have them as pets, they can also be used to fight against one another. Each Pokemon has a specific type and set of moves that they can have. People who play the game use these types and moves to battle against one another. In essence that is the game, it can get more advanced where you look at stats and distribute IVs and EVs but that isn't needed for a regular playthorugh.

Within the games there is a Pokedex that the player uses to keep track of the different Pokemon that they have seen through out their journey, in each generation/iteration of the game the Pokedex changes with some being more advanced than others. To start off with I want mine to be as simple as possible, just a generic list of Pokemon that shows their name, position/number in the Pokedex and their image. Start off basic and expand on the project over time, so now the new UML diagram looks something more like this:

![Pokemon PokeDex UML Basic](/images/posts/PokemonPokedex/PokemonPokedexUMLBasic.png)

This much simpler UML diagram shows how the programs backend would work and how data instances of the Pokemon class can be created and what that would store. As you can see this UML diagram shows the limited data that will be stored to represent each of the different Pokemon, this has been done on purpose to be something that can again be built upon in later versions. However, this diagram shows nothing about how the frontend would work and that is because I kind of need to create a rough design before I can really know what needs to be included within the frontend program.

## Design
When it comes to the design of the program I wanted it to take inspiration from the different Pokedexs that have been seen in the anime and video games. However with my limited UX design and terrible art skills the design isn't great but is something that I can improve upon over time as I develop more of the program. Keeping it basic seemed like the best way to go in order to make sure version 1 was at least something that I could achieve.

![Pokemon PokeDex UX Design Homepage](/images/posts/PokemonPokedex/PokemonPokedexDesign.png)

Now as you can see from the image above it is definetly not the best design that could ever have been created and as the moment it is only a series of wireframes that dictate roughly where each individual element within the program goes. However if you have followed the Pokemon games or event played some of them I am sure you can see where I have taken inspiration from in order to create this design.

Within this first version there is no way to click on a specific Pokemon and get more information about them, instead it is just a simple list of Pokemon that have been saved to the program. For a first version (especially when it comes to design) it is more about getting the ball rolling than having everything done in one go. Of course there are many things that I would like to add to the program but taking an iterative approach where I focus on releasing a working product first then push incremental updates seems like the better way to run the project instead of doing everything in one go, baby steps.

# Conclusion

The project so far is in full swing and the next update will go through how I have created the first version of the program, along with an explaination of all the code and a link to the GitHub repository holding it all. Please feel free to reach out to me if there is anything you would like to see be included within the project or if there is a specific feature that you feel should be included within the PokeDex. I am really looking forward to completing this project and cannot wait to take you along for the ride.