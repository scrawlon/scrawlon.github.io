---
author: Scott McGrath
layout: post
title: Installing Vagrant on Windows 8
description: 
category:
tags: []
comments: true
published: true
---
*** __Disclaimer__ ** I make no guarantees that the following instructions will work for you.
Proceed at your own risk.*

I just bought a used Windows 8 tablet, and I need to get a working development environment on it.
I usually work with Macs and Linux, so my aim is to run Linux from Windows. VirtualBox makes this possible.
Just like running any other program, the new OS opens in its own window.

Vagrant uses VirtualBox to create custom command-line driven virtual machines for projects.
The real magic in Vagrant, is that it
syncs folders between your real OS and your virtual machines.
You can edit a file in your real OS, start your app on localhost in the
virtual machine and then load it in the browser on your real OS. It may sound confusing, but it's very simple
once you start using it.

Installation
------------
* Dependencies (You'll need these installed in order to run Vagrant):   
[VirtualBox](https://www.virtualbox.org/wiki/Downloads) -> "4.2.16 for Windows hosts"  
[Ruby and Git](http://railsinstaller.org) -> "Rails Installer 1.9 will install Ruby, Rails, Git and more"  
[Vagrant](http://downloads.vagrantup.com/) -> 1.2.3 .msi for Windows

* Run this command after running Rails Installer to make ssh work:   
`setx PATH "%PATH%;C:\RailsInstaller\Git\bin"`   
_You have to exit and reopen your command prompt to make windows see the new path._

_Versions listed were the latest at the time of this post_

Create your first Vagrant box
-----------------------------
Most of these instructions are taken directly from the ["Getting Started"](http://docs.vagrantup.com/v2/getting-started/index.html)
guide at [Vagrantup.com](http://vagrantup.com)

1. If you installed Ruby from the link above you should have a _'Command Prompt with Ruby on Rails'_ shortcut
on your desktop. Start by opening your command prompt.

2. Create a new directory for your first Vagrant virtual machine. For example:
`C:\vagrant_test` and change to that directory.

2. Next, we'll initialize this directory and download a Vagrant box.
`vagrant init precise32 http://files.vagrantup.com/precise32.box`  
This step could take an hour or more, depending on you connection speed. Luckily, you only need to download the 'precise32' image once.

3. Now we can start Vagrant and connect to our new virtual machine.
`vagrant up`  
`vagrant ssh`  

If everything worked, you should see a prompt like this:
`vagrant@precise32: $` If so, congrats! You've got a real Ubuntu environment running in Windows.
Your shared folder is in the "/vagrant" directory of your virtual machine.

To get back to your normal prompt, just type "exit". To stop the Vagrant virtual machine,
type "vagrant halt" from your normal prompt. To delete a Vagrant virtual machine, type "vagrant destroy".
