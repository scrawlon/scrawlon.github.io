---
layout: post
title: "Installing Vagrant on Windows 8"
description: ""
category: 
tags: []
comments: true
published: false
---
*** __Disclaimer__ ** I make no guarantees that the following instructions will work for you. 
Proceed at your own risk.*

I just bought a used Windows 8 tablet, because I wanted a lightweight development machine. 
Since I have to set it up anyway, this is a good opportunity to document my process.

If you're not famililar with VirtualBox,
basically it lets you use another operating system inside of your current operating system.
There are a few reasons someone might want to do this, but my needs are for
disposable, repeatable development environments. I create a virtual machine, install whatever
dependencies I need at the moment and delete it when I'm done. If I need that particular setup
again, I can have a fresh new virtual machine installed in minutes.

What's Vagrant? We'll cover the details below, but here's the
long-and-short-of-it: Vagrant lets you create a folder on your computer that has access to its own
virtual machine, specific to the project your working on there. You install your dependencies and run
your apps there, but all of the files you create are mirrored back into the project folder in your
real OS. Furthermore, you can send your app to localhost in the virtual machine and then preview it
in the browser on your real OS. The best part is it's easy to use.

Dependencies
------------
Vagrant requires VirtualBox and Ruby to do its magic:   
 [VirtualBox](https://www.virtualbox.org/wiki/Downloads) Look for "VirtualBox 4.2.16 for Windows hosts"  
 [Ruby](http://rubyinstaller.org/downloads/) Look for "Ruby 1.9.3"  

It shouldn't matter which order you install them, and there are no special settings required - just
run the installers.
