---
title: "Networking Syncthing"
url: Posts/NetworkingSyncthing
date: 2022-10-08
draft: false
tags: ['Syncthing','Ubuntu','Windows','MacOS','Server','File Synchronisation']
icon: '/images/coverimages/NetworkingSyncthing.png'
description: 'Syncthing is an open source tool that you can use to sync your files between all of your devices. This blog post goes through why you should use Syncthing, how to set it up and what my set-up looks like.'
---

# Syncing All the Things
Age of information where we are constantly creating ned documents and files whether for work or personal needs. This mound of information a lot of the time is confined to a single device lets say our laptop. What happens when you leave that laptop behind but need to reference a document or how do you make sure the images you've taken on your phone of your kids are safe.

Cloud storage solutions are the most commonly turned to for this issue where they allow users to backup their data removing the worry that if something happened to their device all of their information would be safe. It seems that every major player in the online space has their own solution to this problem: Google Drive, OneDrive, DropBox, iCloud and many others. I for one was using Google to back up all my data, being able to sync all of my photos to Google Photos free of charge (until very recently) who wouldn't. 

Well as it turns out storing the mountains of data we seem to generate on a daily basis is becoming increasingly more differcult and with data breachs becoming more common with every passing day just who can you trust with your data? Yourself? After all it is your data.

Rather than relying on third party solutions (since Google let me down with their unlimited photo storage solution) I have been using an open source application called [Syncthing](https://syncthing.net) on all of my devices to make sure data is backed up across all of them. Now for those in the computing space using the word back-up with a solution like Syncthing is probably wrong but we can get more into that later on.

Syncthing is an open source program that continually syncs files between two or more devices in real time. The devices that the data is synced to is decided by whoever setups up the application. You can choose to sync all of your files or just specific files that you feel need backing up. There are many different ways that you can use the app and you can also set it up in multiple ways similar to network topologies (I get more into topologies in the Networking Together section of this blog post), it is ultimetly up to you how you want it to work.

# Operating Sync
Each operating system has a different way of installing Syncthing but once it has been installed they all look pretty much the same with the exception of Windows (there always has to be one). I am largely going to explain how to install Syncthing onto 64-bit operating systems with the exception of MacOS (but I believe that brew is universal and can install both 64-bit and Arm versions).

![Syncthing Website](/images/posts/NetworkingSyncthing/01SyncthingLogo.png)

If you do not want to follow along with the download instructions listed here then you can always navitage to: `https://syncthing.net/downloads` and follow the instructions on the offical Syncthing website if you prefer.

Each operating system has a different way of installing an accessing Syncthing, out of all the ways of installing Syncthing MacOS is the easiest as the package can just be installed through the brew package manager. For each operating system I will go through how Syncthing can be installed on the device and then do some basic configuration of the application. 

## Ubuntu Linux
Each package manager has thier own way of adding Syncthing to the list of repositories they can call from, in this example I will be using `apt` as the example but Syncthing has all of the different methods on their website which you can fine [linked here](https://syncthing.net/downloads/). 

To install Syncthing onto Ubuntu first open a terminal and add Syncthings release key using the command `sudo curl -o /usr/share/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg`. (`curl` command was not found) Now that you have added the release key you can choose whether you want to install the stable or candidate channel of Syncthing. I would recommend going with the stable channel as it is normally more reliable than the candidate channel but it is completely up to you (you can also add both, if you want to). 

For the stable channel copy the following command: `echo "deb [signed-by=/usr/share/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list`

For the candidate channel copy this command: `echo "deb [signed-by=/usr/share/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing candidate" | sudo tee /etc/apt/sources.list.d/syncthing.list`

Once you have added your desired channel to your system run `sudo apt-get update` and then `sudo apt-get install syncthing`.

![Ubuntu Terminal Running Commands From Syncthing Website](/images/posts/NetworkingSyncthing/02UbuntuSyncthingCommandCopying.png)
![Ubuntu Downloading Syncthing Using APT](/images/posts/NetworkingSyncthing/03UbuntuInstallingSyncthingAPT.png)

After Syncthing has installed there are a few more things that we need to take care of. By default Syncthing will not have started once installed, so we will need to start the service ourselves using the terminal and `systemctl`. Using the following 3 commands below we will create a link to Syncthing and our user on linux, start the Syncthing service and check the status of the Syncthing service to make sure it is running.

`sudo systemctl enable syncthing@USER` for each user that you want to be able to use Syncthing you will need to enable it on each user, so for myself the command I would use it `sudo systemctl enable syncthing@ubuntu`. The command doesn't start the service, it just enables it for the specific user, to start the service run `sudo systemctl start syncthing@USER` To check the status of the Syncthing service (and make sure that it is running without any errors) `systemctl status syncthing@USER`, if you do see an error on that screen then make sure you followed all the steps above and if you are still having errors then I would recommend going to [r/Syncthing](https://www.reddit.com/r/Syncthing/) on Reddit.

To see Syncthing running open a web browser and navigate to `localhost:8384` where you should be greeted by the screen below:

![Ubuntu Running Systemctl Commands Allow Syncthing Run](/images/posts/NetworkingSyncthing/04UbuntuRunningSystemctlCommands.png)

Syncthing is now installed on your computer. 


### Ubuntu Server
Installing Syncthing onto Ubuntu server is very similar to installing it on Ubuntu however because you do not have a web browser you cannot access the Syncthing website on the device. To change this you need to go into the setup files. On the server navigate to `~/.config/syncthing` and edit the `config.xml` file, scroll down to the GUI section of the document and change the address from `127.0.0.1:8384` to `0.0.0.0:8384`. What this does is change it so the Syncthing home page for that device is available on your home network, this is not recommended if you are operating on an open public network as anyone on the network who knows the IP address of the server would be able to access it.

![Ubuntu Server Adding Syncthing to the Device](/images/posts/NetworkingSyncthing/05UbuntuServerDownloadingSyncthing.png)
![Ubuntu Server Configuring Systemctl Commands](/images/posts/NetworkingSyncthing/06UbuntuServerConfiguringSystemctl.png)
![Ubuntu Server Navigating to Configuration File](/images/posts/NetworkingSyncthing/07UbuntuServerSyncthingConfigurationFileNavigation.png)
![Ubuntu Server Changing Syncthing Configuration File](/images/posts/NetworkingSyncthing/08UbuntuServersyuncthingConfigurationFile.png)

Using the IP address of the server you can navigate to your servers Syncthing home page. For me the address is `192.168.0.0:8384`. If you do open this up to your home network I would set a password for Syncthing which I explain in the Networking Together section of this blog.

## Windows 10/11
To add Syncthing to Windows you could download the [64-bit zip file](https://github.com/syncthing/syncthing/releases/download/v1.21.0/syncthing-windows-amd64-v1.21.0.zip) which you would then be able to run, however that requires you to have a terminal open whenever Syncthing is running at it will not start automatically at boot instead you would have to run it every single time you wanted to synchronise your files. Now I do not know about you but while the first few times I booted up my computer I would remember to run Syncthing eventually I would forget and my files would become desynchronised.

![Syncthing Running from Zip File Windows](/images/posts/NetworkingSyncthing/09RunningSyncthingZip.png)

So rather than using the 64-bit download of Syncthing I instead downloaded [SyncTrayzor](https://github.com/canton7/SyncTrayzor). Now SyncTrayzor is its own separate application that you have to install however, it boots at start up and integrates with every other version of Syncthing. Personally I think that using SyncTrayzor is the easiest way to add Syncthing to Windows unless you did not want to have Syncthing run all the time and instead wanted to choose when you wanted Syncthing to run.

Once again it is completely personaly preference.

![SyncTrayzor Running on Windows](/images/posts/NetworkingSyncthing/10SyncTrayzorOnWindows.png)

Using SyncTrazyor you just have to click on the application and they Syncthing home page will open. Even if you are using SyncTrayzor you can still go to your web browser and navigate to `localhost:8384` but it will just give you the same result as opening SyncTrayzor.

If you opted to install Syncthing using the 64-bit file then open the folder and click on `syncthing.exe`, after a few second the application will start (smartscreen poped up when I tried to run it but your experience may be different) and you can navigate to `localhost:8384` where you will be greeted by your Syncthing home page.

Sidenote: Another possible way to get Syncthing running on your Windows device is to use a package manager called [Chocolatey](https://chocolatey.org/) but the packages that it pulls are normally out of date but it is something you can do if you would like to.

## MacOS
There are 2 main ways to install Syncthing on MacOS, you could install it through brew or download the install package from the Syncthing GitHub. While GitHub is the easier method of installation a case could be made for installing Syncthing through brew. Both methods will be shown below, it is completely up to you which method you choose to go with.

### GitHub Method
Navigate to `https://github.com/syncthing/syncthing-macos/releases/tag/v1.20.4-1` or [click here](https://github.com/syncthing/syncthing-macos/releases/tag/v1.20.4-1) and download the `.dmg` file. Once the file has downloaded simply click on it to run the file. Installation completed you should be able to navigate to the Syncthing home page by going to your browser and typing in `localhost:8384`

![Downloading File From GitHub](/images/posts/NetworkingSyncthing/11SyncthingMacDmg.png)

![Syncthing Running Icon MacOS System ToolBar](/images/posts/NetworkingSyncthing/12SyncthingOnline.png)

### Using `brew`
[`brew`](https://brew.sh) is a package manager for MacOS which allows you to install a range of applications through the terminal. It can be very useful when having to switch Mac as you could create a small install script that installs `brew` onto the computer, then using `brew` you can grab all of the other packages that you would like to install. For a certain type of user (like myself) `brew` is incredible.

To install `brew` run the following command in your terminal `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`, this will download all the files and tools that bew needs to operate. After `brew` has downloaded all of the tools it needs there are two more commands that you need to run, these commands are `echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/macos/.zprofile` (replacing macos with the username of your user) and `eval "$(/opt/homebrew/bin/brew shellenv)"`.

![Installing `brew` on MacOS](/images/posts/NetworkingSyncthing/12InstallingBrew.png)

After everything has been added within the terminal you can download Syncthing using `brew install syncthing`, the download should be pretty quick. Then once it has finished you can just open your terminal and go to `localhost:8384` where your Syncthing homepage will be. 

![Downloading Syncthing Using Brew](/images/posts/NetworkingSyncthing/13BrewInstallSyncthing.png)

# Networking Together
Within Syncthing there are a range of different setting that you can customise to your liking, I am not going to go through all of them here but I will cover the key ones that you might want to use when setting up your Syncthing network.

## Taking Action
In the top right hand corner of the Syncthing homepage there is a little `Actions` toggle menu. Opening reveals a selection of different settings and information areas. `Shutdown` and `Restart` control the Syncthing program, I only really use them when Syncthing is playing up. `Advanced` I have left alone as I do not really know what I am doing when it comes to that section but `logs` can be useful if there are errors when syncing files or something unexpected has happened. `Show ID` just provides you with a QR code and a character string for the devices ID, allowing you to connect it to other devices running Syncthing.

![Syncthing Settings General Tab](/images/posts/NetworkingSyncthing/14SyncthingSettings-GeneralTab.png)

When opening the settings it will be on the `General` tab, I have onyl really been in the `General` and `GUI` tabs of the settings. Within the `General` tab you can change the device name, set the minimum amount of free space required on the disk, whether you do anonymous usage reporting and you will also find your API key.

![Syncthing Settings GUI Tab](/images/posts/NetworkingSyncthing/15SyncthingSettings-GUITab.png)

Under the `GUI` tab you can change the address that you can access the Syncthing homepage from. Some of the devices I have set Syncthing up on I have changed the port number (the `8384` at the end of the address) as I have other things running on those devices. Within this section you can also set a username and password for when you access the webpage for the settings.

## Remote Devices

![Syncthing Home Page](/images/posts/NetworkingSyncthing/16SyncthingHomePage.png)

Connecting devices together using Syncthing is as simple as clicking on the `Add Remote Device` button normally found in the lower right area of the screen.

![Syncthing Add Device General Tab](/images/posts/NetworkingSyncthing/17SyncthingAddDevice-GeneralTab.png)

Here it will ask for the `Device ID` which we were able to see under the `Actions` menu, it will also show you devices that it has found on the current network. You can also give the device a name that it will display instead of the `Device ID`. Often I make these names as descriptive as possible so that it is easy to identify which device it is from a glance.

![Syncthing Add Device Sharing Tab](/images/posts/NetworkingSyncthing/18SyncthingAddDevice-SharingTab.png)

Looking at the sharing tab you can specify folders that you would like to share with the device you are adding, this is handy if you are adding a device to your network to gain access to a folder you are already sharing with other devices. 

## Folder Sharing
Adding remote devices is all well and good but if you do not have any folders to share with the devices you connect there is no much point in setting all of this up. To add a folder to Syncthing click `Add Folder` which is in the right corner of the Folders section of the homepage.

![Syncthing Add Folder General Tab](/images/posts/NetworkingSyncthing/19SyncthingAddFolder-GeneralTab.png)

After clicking `Add Folder` it will open up the general tab of the folder settings. Here you can give the folder a name, specify a folder ID (I generally just leave it at the default one) and specify the path to the folder that you would like to share. Syncthing will try to fill in the path for you, using the label for the folder.

![Syncthing Add Folder Sharing Tab](/images/posts/NetworkingSyncthing/20SyncthingAddFolder-SharingTab.png)

Moving on from the general tab you have the sharing tab, here you can specify which devices you would like to share the folder with if you have already added devices to your Syncthing network. Another thing you can also do is specify passwords for the folder when it is shared with a specific device.

![Syncthing Add Folder File Versioning Tab](/images/posts/NetworkingSyncthing/21SyncthingAddFolder-FileVersioningTab.png)

Last section that I am going to look at is file versioning, I do not use it all that much but it can be handy if you want to keep multiple versions of files across machines, although I would recommend looking into [git](https://git-scm.com) if you want anything more than basic file versioning.

## Topology For You
Anyone who has studied computer science at a basic level will know that computer networks can be set up in multiple different ways called topologies, out of these topologies there are ones that are more favoured than others. The possible topologies that I would use with Syncthing are: line, ring, star and mesh. Examples of how each topology roughly looks are below.

![Line, Ring, Star & Mesh Networking Topologies](/images/posts/NetworkingSyncthing/22NetworkingTopologies.jpg)

These topologies are just examples of how you can set up different networks (including your Syncthing one) and often people mix different topologies depending on their needs and usecases. In the demo section I will show you an example of a basic star

# Demo
Just for demonstration purposes I will be using virtual machines I have created in VMWare Workstation, also to make it easier to follow along with this will be a series of images with small captions just to explain what is going on. After the demonstration I will show you a screenshot of my own Syncthing network.

![Syncthing HomePage on UbuntuVM1](/images/posts/NetworkingSyncthing/20SyncthingHomePage-UbuntuVM1.png)
From the first virtual machine I am going to open the drop down menu and copy the device ID so that I can add it to the second virtual machine. For this entire demonstration I am just going to be using the default folder that Syncthing creates when it is installed onto the maachine.
![Syncthing Show Device ID Screen UbuntuVM1](/images/posts/NetworkingSyncthing/21ShowDeviceID-UbuntuVM1.png)
![Syncthing Add Remote Device UbuntuVM2](/images/posts/NetworkingSyncthing/22AddRemoteDevice-UbuntuVM2.png)
Now that I have copied the ID I can add it to the second Ubuntu machine we have, choosing to give it a custom name if I would like to. I would recommend giving all the machines in your network sort of descriptive names so that you can look at themquickly to understand why they are on your network.
![Syncthing Add Remote Device Fourm Filled In UbuntuVM2](/images/posts/NetworkingSyncthing/23RemoteDeviceFourm-UbuntuVM2.png)
Once you have added the remote device you will need to go to the machine you have just added as it will ask you to confrm that you want to add this device.
![Syncthing Confirm Addition UbuntuVM1](/images/posts/NetworkingSyncthing/24ConfirmRemoteDeviceAddition-UbuntuVM1.png)
Now that you have added these 2 machines together you will see them in your remote devices section on the Syncthing homepage.
![Syncthing HomePage Remote Devices Added UbuntuVM2](/images/posts/NetworkingSyncthing/25SyncthingHomePageWithAddedRemoteDevice-UbuntuVM2.png)
Now that you have connected the devices you can share folders between the devices. Something you should note is that you can change the name of the folder on the device it is being synced with without affecting the name of the folder on the original device. By default Syncthing will give it the name that you give it in the name you do when adding the folder to Syncthing but it is something that you can freely change. To add a folder simply click on add a folder.
![Blank Fourm Appear Click Add Folder UbuntuVM2](/images/posts/NetworkingSyncthing/26BlankFolderFourm-UbuntuVM2.png)
When adding the folder you can give it a custom name, just make sure that you change where the folder is located on your system otherwise Syncthing will either create one or just crash (I have had both happen to me).
![Adding Folder Fourm Filled In UbuntuVM2](/images/posts/NetworkingSyncthing/27AddingFolderComplete-UbuntuVM2.png)
Now that the first section has been filled in I would change the tab over to `sharing` so that you can choose a device to share the folder with. In this example I will be choosing UbuntuVM1 (as that is the only other device that we have connected so far).
![Sharing Tab of Adding a Folder Syncthing UbuntuVM2](/images/posts/NetworkingSyncthing/28SharingFolderSettings-UbuntuVM2.png)
After you have filled in everything that you want to you can add the folder to Syncthing. If you have selected a remote device to share the folder to then you will need to go to that device and confirm that you would like to add it to the machine.
![Confirm Adding Folder From UbuntuVM2 To UbuntuVM1](/images/posts/NetworkingSyncthing/29ConfirmAddingFolder-UbuntuVM1.png)
![Confirm Adding Folder Fourm UbuntuVM1](/images/posts/NetworkingSyncthing/30ConfirmAddingFolderFourm-UbuntuVM1.png)

There you go, you have shared a folder from one computer to the next. Forr the second part of this demo I am going to build on what we have already done by adding a 3rd virtual machine and then setting one of the virtual machines to act as sort of a central server that all of the other machines connect and sync to. This is not something you need to do but, if you happen to have a device where you would like or even need all of the files from your other devices to sync to then feel free to set your own Syncthing build up like this. 

![UbuntuVM1 Syncthing Home Page with Documents Synced](/images/posts/NetworkingSyncthing/31SyncthingConnected-UbuntuVM1.png)

The images below show me adding the 3rd virtual machine and connecting it to the 2nd virtual machine. Then sharing the folder that we are currently sharing from UbuntuVM2 to UbuntuVM2, adding it to UbuntuVM3 through UbuntuVM2 (sounds complicated, easier to show you what I mean).

![Connecting UbuntuVM3 to UbuntuVM2 - Filling in Fourm on UbuntuVM3](/images/posts/NetworkingSyncthing/32ConnectingUbuntuVM3Network-UbuntuVM3.png)
![Accepting Connection Request UbuntuVM3 on UbuntuVM2](/images/posts/NetworkingSyncthing/33AcceptingConnectionRequestUbuntuVM3-UbuntuVM2.png)
![Sharing Folder With UbuntuVM3](/images/posts/NetworkingSyncthing/34SharingFolderUbuntuVM3-UbuntuVM2.png)
![Accepting Share Folder Request](/images/posts/NetworkingSyncthing/35AcceptingShareFolderRequest-UbuntuVM3.png)

As you can see from the example above all the devices on the network are connected through UbuntuVM2, Doing it this way means that the device acts as a central file server of sorts, setting things up this way can be easier because you do not have to remember which devices are connected together and where folders are. Just having a single device having everythng on it and all the connections go through it seems easier to me. 

# My Personal Use
My setup is very similar to what I showed you in the demo. For the device that is acting as my file server I have an old computer running Ubuntu Server. From there all of my other devices are connected. Some of the folder names will be coloured out as they contain names.

![My Ubuntu Server Syncthing Setup Screenshot](/images/posts/NetworkingSyncthing/40PersonalSyncthingServer.jpg)

My setup is not the only way to do things, it is just the way I felt mostly commfortable with setting things up as it also gave me an excuse to play around more with Ubuntu Server. If I was to do my setup again, completely from scratch I would instead build a dedicated server/computer for Proxmox (blog post coming soon, after I have played with it a little more) which is a type 1 hypervisor. I would do things this way so that I could do more with the single system than just run Syncthing. However, at the time I did not have the money or the time to create a dedicated server for myself and so I am quite pleased that I have achieved what I have with just the small machine I had lying around at the time.
