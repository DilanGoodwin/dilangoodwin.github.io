---
title: "AdventOfCode Day01 Calorie Counting"
url: /Programming/AdventOfCode
date: 2022-12-25
draft: false
tags: ['AdventOfCode','Programming','Java']
description: 'My write up of Day 01 of the AdventOfCode challenge that took place from 1st December 2022 to 25th December 2022.'
---

![Cover Image](/images/coverimages/AdventOfCode.png)
[Room Link: AdventOfCode Day01](https://adventofcode.com/2022/day/1)

# What is AdventOfCode
AdventOfCode is a programming challenge that takes place during December. In total it is the 25 days leading up to Christmas. Each challenge gives you a small brief to look over to help you understand the problem at hand, then you are also given some input data to use within the program you create to get the answer to the problem. 

I have found that it often centers around sorting/parsing data so that you only get the bits that you need and then doing some simple calculations within the program. The language that you use to complete the challenge is completely up to you. I have decided to use the Java programming language as it is what I am currently using at university and is a language that it never hurts to get more practice in. This challenge can be a good way to throw yourself straight into the deepend to learn a new programming language but I would recommend using one that you know fairly well.

Something else that I am going to point out is that you do not have to complete this over the 25 days that the challenge is going on for. Currently I have not done all of the different days for 2022 as university work too precidence but I am planning to go over them where I can to complete the challenge. Another thing to keep in mind is that everyones approaches to these programming challenges will be different and often the solutions that you come up with will be different so do not worry about having a different solution to someone else.

# Day 01: Calorie Counting - Part 1
First day for the challenge lets see what is has instore. For all of these different days the brief that is going to be written below will be taken directly from the challenge website (linked above).

## The Brief
Santa's reindeer typcially eat regular reindeer food, but they need a lot of magical energy to deliver presents on Christmas. For that, their favourite snack is a special type of star fruit that only grows deep in the jungle. The Elves have brought you on their annual expedition to the grove where the fruit grows. \
To supply enough magical energy, the expedition needs to retrieve a minimum of fifty stars by December 25th. Although the Elves assure you that the grove has plenty of fruit, you decide to grab any fruit that you see along the way, just in case. \
Collect stars by solving puzzules. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants you a star. Good luck!

The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on foot. As your boats approach land, the Elves begin taking inventory of their supplies. One important consideration is food - in particular, the number of Calories each Elf is carrying (your puzzle input). \
The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought with them, one item per line. Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line. \
For example, suppose the Elves finish writing their items' Calories and end up with the following list:

```
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
```

This list represents the Calories of the food carried by five Elves:
* The first Elf is carrying food with `1000`, `2000`, and `3000` Calories, a total of `6000` Calories.
* The second Elf is carrying one food item with `4000` Calories.
* The third Elf is carrying food with `5000` and `6000` Calories, a total of `11000` Calories.
* The fourth Elf is carrying food with `7000`, `8000`, and `9000` Calories, a total of `24000` Calories.
* The fifth Elf is carrying one food item with `10000` Calories.

In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is `24000` (carried by the fourth Elf). \
Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

## Creating a Solution 
Frist thing I did was create a new Java program called `CalorieCounting.java` and then thought of how best to break the program up into different sections. Now I am not a big fan of writing everything as one giant program, what I will do instead is break a program into smaller sections that you can then program individually. Doing it this way also means that I can check each section individually making it easier to find errors within the code.

I decided on having three different functions called: `importFile`, `parseFile`, `largestCalorieAmount`.

### `importFile`
This section is quite self explainary, all I wanted it to do was import the file. Using a scanner that imported into an ArrayList of Strings means that it was quite easy to go through the provided input set adding everything into the program. When it comes to importing the puzzle inpuit into the program I wanted to try and make it so you do not have to edit anything within the provided file so that you could esentially point my program in the direction of your file and it would calculate the answer to the problem.

Below is the function in its entirety:

```
public static ArrayList<String> importFile(String fileLocation) throws FileNotFoundException{
    ArrayList<String> fileContents=new ArrayList<>();
    Scanner readFile=new Scanner(new File(fileLocation));

    while(readFile.hasNextLine()){
        fileContents.add(readFile.nextLine());
    }

    readFile.close();
    return fileContents;
}
```

### `parseFile`
The provided input file includes spaces/gaps between each of the different elf calorie sections. This can be used to our advantage when calculating the total calorie amount that the elf is carrying, as we can go through the ArrayList of all the imported data and add all the values that come before an empty cell within the ArrayList together. Then once they have all been added together they can be added to another ArrayList that store the total number of calories each elf is carrying.

Below is the function in its entirety:

```
public static ArrayList<Integer> parseFile(ArrayList<String> values){
    ArrayList<Integer> totalElfCalories=new ArrayList<>();
    int totalCalories=0;

    for(int i=0;i<values.size();i++){
        if(values.get(i)!=""){
            totalCalories+=Integer.parseInt(values.get(i));
        }else if(values.get(i)==""){
            totalElfCalories.add(totalCalories);
            totalCalories=0;
        }
    }

    return totalElfCalories;
}
```

One thing you will notice is that in each case the Integer had to be parsed, this is because I was treating the Strings stored within the ArrayList as Integers when adding them together and trying to store them within the Integer ArrayList. 

### `largestCalorieAmount`
This function is a simple for loop that is looking for the largest calculated calorie value within the Integer ArrayList.

Below is the function in its entirety:

```
public static int largestCalorieAmount(ArrayList<Integer> values){
    int largestCalorie=0;

    for(int i=0;i<values.size();i++){
        if(largestCalorie<values.get(i)){
            largestCalorie=values.get(i);
        }
    }

    return largestCalorie;
}
```

## My Answer
The answer that I calculated to the question was `68787`. 

# Day 01: Calorie Counting - Part 2

## The Brief
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.
To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.
In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with `11000` Calories), then the fifth Elf (with `10000` Calories). The sum of the Calories carried by these three elves is `45000`.
Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?

## Creating a Solution 
Looking at the brief there doesn't seem to be a lot that we need to change within our functions. The only one that I am going to mess within is `largestCalorieAmount` and change it to `top3CalorieAmount` as we now need it to calculate the total of the top 3 calories. 

### `top3CalorieAmount`
What the new function needs to do is iterate through the provided ArrayList 3 times, each time removing the largest integer value and adding it to a variable for storage. The added value then needs to be removed from the ArrayList so we do not get the same value multiple times ruining our answer. \
When looking at the code you will see that I have taken the old function and just added a few small pieces around it to now calculate the new answer to the question.

Below is the function in its entirety:

```
public static int largestCalorieAmount(ArrayList<Integer> values){
    int largestCalorie=0;

    for(int j=0;j<3;j++){
        int caloriePosition=0;
        int currentLargestCalorie=0;

        for(int i=0;i<values.size();i++){
            if(currentLargestCalorie<values.get(i)){
                currentLargestCalorie=values.get(i);
                caloriePosition=i;
            }
        }

        values.remove(caloriePosition);
        largestCalorie+=currentLargestCalorie;
    }

    return largestCalorie;
}
```

## My Answer
The answer that I calculated to the question was: `198041`

# Conclusion
This was a fun challenge, it was difficult at first working out how to import files into Java programs as it is not something that I really have to do every day but, now that it is something I know it can be used over and over again. It is also nice to do something different with the programming languages that I know. \
If you have not tried it yourself then I really do recommend it, for beginners it can be quite hard but if you take your time and approach it one step at a time then I am sure you can do it. For those who are more advanced try imposing your own rules on the challenge, you do not have to leave the file plain but that is a challenge that I have imposed on myself so that others can use their own puzzle input within my program.

You can find my program on my GitHub, linked on the side.