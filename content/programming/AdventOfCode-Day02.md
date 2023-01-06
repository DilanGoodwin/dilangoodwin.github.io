---
title: "AdventOfCode Day02 - Rock Paper Scissors"
url: /Programming/AdventOfCode
date: 2023-01-01
draft: false
tags: ['AdventOfCode','Programming','Java']
description: 'My write up of Day 02 of the AdventOfCode challenge that took place from 1st December 2022 to 25th December 2022.'
---

![Cover Image](/images/coverimages/AdventOfCode.png)

[Room Link: AdventOfCode Day01](https://adventofcode.com/2022/day/2)

# What is AdventOfCode
AdventOfCode is a programming challenge that takes place during December. In total it is the 25 days leading up to Christmas. Each challenge gives you a small brief to look over to help you understand the problem at hand, then you are also given some input data to use within the program you create to get the answer to the problem. 

I have found that it often centers around sorting/parsing data so that you only get the bits that you need and then doing some simple calculations within the program. The language that you use to complete the challenge is completely up to you. I have decided to use the Java programming language as it is what I am currently using at university and is a language that it never hurts to get more practice in. This challenge can be a good way to throw yourself straight into the deepend to learn a new programming language but I would recommend using one that you know fairly well.

Something else that I am going to point out is that you do not have to complete this over the 25 days that the challenge is going on for. Currently I have not done all of the different days for 2022 as university work too precidence but I am planning to go over them where I can to complete the challenge. Another thing to keep in mind is that everyones approaches to these programming challenges will be different and often the solutions that you come up with will be different so do not worry about having a different solution to someone else.

# Day 02: Rock Paper Scissors - Part 1

## The Brief
The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant Rock Paper Scissors tournament is already in progress. \
Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw. \
Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: `A` for Rock, `B` for Paper, and `C` for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent. \
The second column, you reason, must be what you should play in response: `X` for Rock, `Y` for Paper, and `Z` for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen. \
The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores for each round. The score for a single round is the score for the shape you selected (`1` for Rock, `2` for Paper, and `3` for Scissors) plus the score for the outcome of the round (`0` if you lost, `3` if the round was a draw, and `6` if you won). \
Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide. \
For example, suppose you were given the following strategy guide:

```
A Y
B X
C Z
```

This strategy guide predicts and recommends the following:
* In the first round, your opponent will choose Rock (`A`), and you should choose Paper (`Y`). This ends in a win for you with a score of `8` (`2` because you chose Paper + `6` because you won).
* In the second round, your opponent will choose Paper (`B`), and you should choose Rock (`X`). This ends in a loss for you with a score of `1` (`1` + `0`).
* The third round is a draw with both players choosing Scissors, giving you a score of `3` + `3` = `6`.

In this example, if you were to follow the strategy guide, you would get a total score of `15` (`8` + `1` + `6`). \
What would your total score be if everything goes exactly according to your strategy guide?

## Creating a Solution
Looking at the breif it seems quite simple, using the input provided parse it into the program calculating the win condition and the move score, add them both together then you have your result. But for some reason I saw a need to over complicate the whole solution so rather that having 3 functions to give me the answer I instead have 5. Looking over it now I can see that I do not need 5 functions but I have them now nevertheless. \
These functions are: `importFile`, `parseFile`, `gameResult`, `gameScore` and `moveScore`.

### `importFile`
Throughtout all of the different AdventOfCode day writeups you are probably going to see this function, it is how I get any data from within a file into my program regardless of the data type. By always adding all of the data into an ArrayList of the String type it will accept anything that I can then create a separate function to parse through as needed. Now I should contain the entire statement within a try catch statement as there is a chance that if the file is not within the specified location that the program will crash but as this isn't a large program and I put the file in the same location every single time I am not worried about that.

Below is the function:

```
public static ArrayList<String> importFile(String fileLocation) throws FileNotFoundException{
    ArrayList<String> file=new ArrayList<>();
    Scanner readFile=new Scanner(new File(fileLocation));

    while(readFile.hasNextLine()){
        String data=readFile.nextLine();
        data=data.charAt(0)+""+data.charAt(2);
        file.add(data);
    }

    readFile.close();
    return file;
}
```

### `parseFile`
Now I will be the first to admit that this function is useless. All it does is change one character into another, not because it needs to but just for readability. I recon I did this because I was stuck on how to compare the different characters to work out who would win the round, there is no need for the function to be there at all but it is.

The function is below:

```
public static ArrayList<Character> parseFile(ArrayList<String> importedFile,int positionValue){
    ArrayList<Character> playerMoves=new ArrayList<>();

    for(int i=0;i<importedFile.size();i++){
        char moveMade=importedFile.get(i).charAt(positionValue);

        switch(moveMade){
            case 'X':case 'A':
                moveMade='R';
                break;
            case 'Y':case 'B':
                moveMade='P';
                break;
            case 'Z':case 'C':
                moveMade='S';
                break;
        }
        playerMoves.add(moveMade);
    }
    return playerMoves;
}
```

The function takes two different parameters, one is the imported file that is to be manipulated and the other is something called `positionValue`. What the position value actually is is the index of the move that I am looking at. You will have seen when you looked at the `fileImport` function that I removed the spaces from the file which means each of the moves looks as follows:

```
CZ
CZ
CY
```

So what the position value is doing is telling the method which one to look at, either position 0 or position 1.

### `gameResult`
The only parameter this method takes is the `importFile` result but within itself it calls the `parseFile` method twice (once for each of the players). It then goes through the two different move sets using a switch statement to work out whether it was a win, lose or draw. What I could also have done within this function but didn't was calculate how much the move was worth, as each move within the game also has a point associated with it but I did not and instead chose to make a separate method to do that.

Below is the function: 
```
public static ArrayList<Integer> gameResult(ArrayList<String> importedFile){
    ArrayList<Integer> result=new ArrayList<>();
    ArrayList<Character> myMoves=parseFile(importedFile,1);
    ArrayList<Character> opposingMoves=parseFile(importedFile,0);

    for(int i=0;i<myMoves.size();i++){
        if((myMoves.get(i))==(opposingMoves.get(i))){
            result.add(3);
        }else{
            switch(myMoves.get(i)){
                case 'R':
                    if(opposingMoves.get(i)=='P'){
                        result.add(0);
                    }else{
                        result.add(6);
                    }
                    break;
                case 'P':
                    if(opposingMoves.get(i)=='S'){
                        result.add(0);
                    }else{
                        result.add(6);
                    }
                    break;
                case 'S':
                    if(opposingMoves.get(i)=='R'){
                        result.add(0);
                    }else{
                        result.add(6);
                    }
                    break;
            }
        }
    }
    return result;
}
```

What I should also have done within this method that I did not was have it add the resulting scores to a single integer variable instead of another ArrayList, adding it to an ArrayList now means that I will have to go through the ArrayList at some point to add all the scores together to give the resulting score. If only I had though of this earlier though. 

### `gameScore`
All this method does is go through the result of `gameResult` adding all of the values together, another unecessary method that I had to add because I was other thinking things.

Below is the function in question:
```
public static int gameScore(ArrayList<Integer> moveResults){
    int result=0;

    for(int i=0;i<moveResults.size();i++){
        result+=moveResults.get(i);
    }

    return result;
}
```

### `moveScore`
As I did not calculate how much each move was worth within the `gameResult` method this is the method that I used to add them all together. Atleast this one does not all of them to an ArrayList that I then need a separate method to add up for me.

The function is below:
```
public static int moveScore(ArrayList<String> importedFile){
    int result=0;
    ArrayList<Character> myMoves=parseFile(importedFile,1);

    for(int i=0;i<myMoves.size();i++){
        switch(myMoves.get(i)){
            case 'R':
                result+=1;
                break;
            case 'P':
                result+=2;
                break;
            case 'S':
                result+=3;
                break;
        }
    }
    return result;
}
```

## My Answer
The answer that I calculated to the question was `13682`.

# Day 02: Rock Paper Scissors - Part 2

## The Brief
The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: `X` means you need to lose, `Y` means you need to end the round in a draw, and `Z` means you need to win. Good luck!" \
The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:
* In the first round, your opponent will choose Rock (`A`), and you need the round to end in a draw (`Y`), so you also choose Rock. This gives you a score of `1` + `3` = `4`.
* In the second round, your opponent will choose Paper (`B`), and you choose Rock so you lose (`X`) with a score of `1` + `0` = `1`.
* In the third round, you will defeat your opponent's Scissors with Rock for a score of `1` + `6` = `7`.

Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of `12`. \
Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?

## Creating a Solution
Now for this section section I saw the need to make some large changes to the way the program worked. Now you may think "Dilan did you finally see all the mistakes you made in the first version of the program and are you going to correct them all for this section part?" While you would be right to think that the answer is no, no I am not going to correct them, instead I am going to double down on the mistakes. \
Once again this program did not need several different method but it has them: `importFile`, `parseMyMoves`, `parseOpposingMoves`, `roundLoss`, `roundWin`, `myMovesToMake`, `roundScore` and `movesScore`. \
`importFile` and `moveScore` stayed exactly the same but almost everything else about the program changed for some reaon.

Now looking back over the brief I know that I need to work out the move that I need to make in order to get the result needed but that still does not seem to explain why I need so many different methods.

### `parseMyMoves`
This method goes through the imported file and adds all the characters at index location 1 to an ArrayList of characters. This is one of the methods that I think I do not really need as when it comes to seeing what outcome I want it is alos better to know the enemies move so that I can choose my move to guarantee the outcome I would like. \
The function is below:

```
public static ArrayList<Character> parseMyMoves(ArrayList<String> importedFile){
  ArrayList<Character> myMoves=new ArrayList<>();

  for(int i=0;i<importedFile.size();i++){
    myMoves.add(importedFile.get(i).charAt(1));
  }

  return myMoves;
}
```

Looking back at it what this method should do is look at what I would like the outcome to be, look at my opponents move and then create a character ArrayList of all the different moves that I would need to make to get the outcomes that I would like. Then I could use that ArrayList to calculate the total value of all the moves that I would have made within the game. 

### `parseOpposingMoves`
Similar to `parseMymoves` this method takes the imported file and pulled out all of the opponents moves, it then puts them all through a switch case to make them more readable which isn't really necessary. Again I think this function could be removed or really combined with another function. Instead of two different functions to parse the move sets there could be a single function that parses both of the move sets instead. \
The function is below:

```
public static ArrayList<Character> parseOpposingMoves(ArrayList<String> importedFile){
  ArrayList<Character> opposingMoves=new ArrayList<>();

  for(int i=0;i<importedFile.size();i++){
    char moveMade=importedFile.get(i).charAt(0);

    switch(moveMade){
      case 'A':
        moveMade='R';
        break;
      case 'B':
        moveMade='P';
        break;
      case 'C':
        moveMade='S';
        break;
    }
    opposingMoves.add(moveMade);
  }

  return opposingMoves;
}
```

### `roundLoss`
This method takes the opposing players move and then returns the move that I would need to make in order to lose the game. It is quite simple and is again another example of a method that could be combined with something else. \
Function is below:

```
public static char roundLoss(char opposingMove){
  char move='|';

  switch(opposingMove){
    case 'R':
      move='S';
      break;
    case 'P':
      move='R';
      break;
    case 'S':
      move='P';
      break;
  }

  return move;
}
```

### `roundWin`
This method is `roundLoss` but for winning, taking the opposing players move and returning the one that I would need to make in order to win the round. \
The function is below:

```
public static char roundWin(char opposingMove){
  char move='|';

  switch(opposingMove){
    case 'R':
      move='P';
      break;
    case 'P':
      move='S';
      break;
    case 'S':
      move='R';
      break;
  }

  return move;
}
```

### `myMovesToMake`
This is the method that combines everything together for the most part. The only parameter that it takes is the imported file. From there is calls `myMoveValues` and `opposingMoves` while also creating an empty ArrayList called `movesToMake`. A switch statement is then used to work out the outcome that I would like for the round. Depending on the outcome that has been chosen the method will call `roundLoss` or `roundWin`, if it is a draw that is needed then it will add the value of the opposing player to the ArrayList. \
Once this has been calculated for every move the ArrayList `movesToMake` is returned.

The function is below:

```
public static ArrayList<Character> myMovesToMake(ArrayList<String> importedFile){
  ArrayList<Character> movesToMake=new ArrayList<>();
  ArrayList<Character> myMoveValues=parseMyMoves(importedFile);
  ArrayList<Character> opposingMoves=parseOpposingMoves(importedFile);

  for(int i=0;i<myMoveValues.size();i++){
    if(myMoveValues.get(i)=='Y'){
      movesToMake.add(opposingMoves.get(i));
    }else{
      switch(myMoveValues.get(i)){
        case 'X':
          movesToMake.add(roundLoss(opposingMoves.get(i)));
          break;
        case 'Z':
          movesToMake.add(roundWin(opposingMoves.get(i)));
          break;
      }
    }
  }
  return movesToMake;
}
```

### `roundScore`
This method calculates the score of all the different rounds retuning the total as an integer value. \ 
The method is below:

```
public static int roundScore(ArrayList<String> importedFile){
  int result=0;
  ArrayList<Character> roundResult=parseMyMoves(importedFile);

  for(int i=0;i<roundResult.size();i++){
    switch(roundResult.get(i)){
      case 'X':
        break;
      case 'Y':
        result+=3;
        break;
      case 'Z':
        result+=6;
        break;
    }
  }
  return result;
}
```

## My Answer
The answer that I calculated to the question was `12881`.

# Conclusion
Well this was a fun ride wasn't it. While my programming was not the best for this one as there were many things that I could have done better but we got there in the end didn't we. Thank you very much for reading and I hope that you found my breakdown of how I tackled the challenge a little helpful. 