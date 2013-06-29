---
layout: post
title: "How to Resize a VirtualBox VM"
description: ""
category: 
tags: []
---

So, I recently found out what happens when a virtual machine
runs out of space. Just resize the hard drive, right? Intuitively, one might
think there'd be a button for that... There isn't.  A little background: I'm on OS X 10.7.5 and VirtualBox 4.2.12

*** __Disclaimer:__ *This could potentially destroy all data on your virtual
machine. Back up all your data, and proceed at your own risk.*

Here's how I did it:  
--------------------

1. Shut down the virtual machine you're trying to resize.

2. Open an OS X terminal window and navigate to the directory where your virtual
machine is. Mine is in "VirtualBox VMs/Ubuntu". In the remaining steps, you'll be
typing commands at the Terminal prompt.

3. If your virtual machine is in .vmdk format, you need to convert it to .vdi:   
`VBoxManage clonehd Ubuntu.vmdk clone.vdi -format VDI`  
(replace Ubuntu.vmdk with the name of your virtual machine) You should see a
progress bar going from 0% to 100%.

4. Now you can finally resize the hard drive:  
`VBoxManage modifyhd clone.vdi --resize 20000`   
(where the number is the new size in mb) 

Half way there! Now you have to repartition the hard drive,
so your virtual machine can use the space you just added. Fortunately, someone has
already written an excellent guide: 
[How To Enlarge a Virtual Machine’s Disk in VirtualBox or VMware](http://www.howtogeek.com/124622/how-to-enlarge-a-virtual-machines-disk-in-virtualbox-or-vmware)  
__Skip about halfway down to the paragraph beginning "You can use a GParted live
CD..."__

__TIP:__ If you're unable to resize your partition because there's a swap file in
the way, follow this guide: 
[Expanding a Linux disk with gparted (and getting swap out of the way)](http://blog.mwpreston.net/2012/06/22/expanding-a-linux-disk-with-gparted-and-getting-swap-out-of-the-way/)

Virtualization is an amazing thing.
The ability to create customized, clonable, disposable virtual computing
environments is endlessly useful. If that interests you, stay tuned for my next
post about [Vagrant](http://http://www.vagrantup.com/)
