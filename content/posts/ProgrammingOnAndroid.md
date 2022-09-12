---
title: "Programming On Android - Why Bother?"
url: /Posts/ProgrammingAndroid
date: 2022-09-10
draft: false
tags: ['Samsung','F-Droid','Termux','Syncthing','Programming','Markor','Editor']
icon: '/images/coverimages/ProgrammingOnAndroid.png'
description: 'A dream of mine is only needing a single computing device to complete all of my tasks so I set out to see if I could program on my phone when out and about. It worked out and this is a short post about how to achieve the same thing.'
---

# Computer in Your Pocket
Android is an "Open Source" operating system for mobile devices. My reasoning for putting open source in quotation marks is that the openly accessable version of Android that people can look at is almost never what is shipped on mobile devices. Each company makes their own modifications to the code which is fine but often leads to it not being as open source as some people are lead to belive. When it comes to your mobile device there is still a lot you can do on it though, installing random APK files from the internet (not recommended but something you can do) or using alternative stores to the Google Play Store.

Having a computing device in your pocket at all times raises the questions as to whether you could program on Android and completely ditch the desktop. While you can technically program on Android unfortunately it is not yet at the stage where you can get rid of your desktop computer but for quick fire programs it is not actually that bad. For nearly a year I have been using 5 different apps on my phone to write documentation and small programs without the need for a desktop computer. 

![Termux Updating Repositories](/images/programmingandroid/01TermuxUpdating.png "Termux Updating repositories List Using `pkg upgrade` Command")

Is it optimised for it? No. 
Is it fast? No. 
But it is possible.

This small blog post is going to go through how I set my Android device up for programming and how I still use it to this day.

# Alternative Stores on Android
[Amazon Appstore](https://www.amazon.com/gp/mas/get-appstore/android/), [SideME](http://slideme.org/), [Galaxy Store](https://www.samsung.com/levant/apps/galaxy-store/), [Mobile9](https://www.mobile9.com/) and [F-Droid](https://f-droid.org/) are all examples of alternative app stores that you could use instead of Google Play. Unfortunately these app stores cannot be installed directly from Google Play as they are competitors (kind of), so if you would like to use them then you will need to download their installation files (use the websites linked, you will find them there). 

A lot of Android devices have some scary warnings when you try to install files that are not from officail sources (or just not from pre-installed app stores), Samsung is a good example of this. To install an apk file onto your Samsung device you have to allow the specific app you are using to install apk files which is hidden within the settings of your device, and then a warning pops up which of course has to mention that what you are installing could be potential malware. 

![Samsung APK Installation Warning](/images/programmingandroid/02SamsungInstallation.png "Samsung Warning When Installing APK Files From Internet")

General rule of thumb when installing things onto your mobile device (or any device for that matter) is make sure you known what it is that you are installing, if it comes from the official source and not some third party site then you should have nothing to worry about but it doesn't hurt to double check.

Now the apps that I want to install are located on the F-Droid store so I will install that app store onto my device and update its repositories.

![F-Droid Store Updating Repositories](/images/programmingandroid/03FDroidUpdating.png "F-Droid Refreshing Repositories List & Allowing Other Repository Lists")

Once F-Droid has updated all of its repositories you can download any apps you want. Every time that I install F-Droid onto a new device I also go into its settings and enable the other repositories that are not turned on by default, it is also here that you can add your own repositories to F-Droid if you would like to.

![F-Droid Third Party Repository Settings](/images/programmingandroid/04FDroidRepositorySettings.png "F-Droid Third Party Repository Settings")

Within F-Droid I normally get 3 apps: [Termux](https://termux.dev/en/), [Markor](https://github.com/gsantner/markor) & [Syncthing](https://syncthing.net/). Markor is the least interesting of the 3 and for myself has mostly been replaced by an app called [Editor](https://github.com/billthefarmer/editor). While the GitHub page for Editor says that it is available on F-Droid I was unable to find it and instead just downloaded it from GitHub.

Both Editor and Markor are editing apps that allow you to open any file and edit its plain text, obviously this works best for files that are already plain text editable like markdown or txt files but there is not reason why you couldn't open anything in it.

## Termux
Now if all you would like to do on your Android device is write code and create documentation then you do not need to install Termux. But if you want to test some of the programs you create or you just like messing around within the terminal then Termux is the app for you. 

![Termux Application Home Screen](/images/programmingandroid/05TermuxHome.png "Termux Application on Home Screen")

Termux is a terminal emulator for Android and is extremely powerful for those who are willing to take on a bit of a learning curve. Compared to some people who use Termux I have not come even close to what they can do but for testing those quick programming ideas on the go Termux has become a must have for me. 

Once Termux has been downloaed onto your device there are a few things you should do, it is very unlikely that the application will be the most up to date version so running `pkg upgrade` will take a moment or two while it gets everything. Time to get some packages installed, for myself running `pkg install git scala python3 java` graps everything I need for on the go.

By default Termux cannot access your internal storage, now this is a good thing if you do not need to access the files you create within Termux and it can stop you from completely breaking your device. But if you need to access the files you have created from outside Termux then you will need to run the command `termux-setup-storage` and grant the app storage access.

![Termux Accessing Internal Android Storage](/images/programmingandroid/06TermuxAcessStorage.png "Termux Accessing Internal Storage of Android Device & Storing Files There")

## Syncthing
When working across multiple devices it is helpful to have the files that you are working on synced across those devices. You could use a cloud storage solution like Google Drive/One Drive or you could carry your files around on a USB stick but both of those come with their own risks. Storing your files on cloud solutions means that a third party has access to your files, a lot of the time that is not an issue (especially for somehting like this where it is going on GitHub anyway) but other times when you are working on sensative documents or things you just don't want to be accessable online having a memeory device seems like the only solution. However, using a USB stick while convenient, as all your files are in a single location, comes with its own risk like losing it or it becomming damaged and corrupting the files. Obviously if you are using the 123 rule of backup then this shouldn't be an issue but how do you use that rule without using a memory stick or a cloud solution.

In comes Syncthing a file syncronisation program that is open source and works across many different platforms. There are many different ways that you can set it up which you could base of the different network topologies that are available. If you are interesting in setting up Syncthing or seeing the different ways you can link the computers together I will be writing a blog post on it which I will link [Here]({{< ref "/posts/NetworkingSyncthing" >}}).

# How I Use It
There are not many situations when this setup is extremely useful but when travelling from one place to another without enough space to use my laptop it is handy to just quickly proof read some documentation or quickly make notes on a program. It also means that I always have a copy of my programs on my phone so there are some cases where programs can come in handy when on the move.

# Conclusion
This is not something I recommend using all of the time but if you have an Android device then it can be handy when out and about to be able to quickly edit documents. Are there downsides sure, can it be annoying some of the time because there are missing features sure but, it is just cool that something like this is possible.

If you do end up messing around with something like this setup then I hope you have an enjoyable time.
