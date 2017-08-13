---
author: Scott McGrath
layout: post
title: "ChrUbuntu + Acer C720"
subheading: "Collected Tips and Fixes"
description: ""
category:
post_date: 2014-07-11
tags: []
comments: true
---

I've been running ChrUbuntu on a C720 for a couple months now.
It's a great cheap laptop option for developers, but it does require a few
OS tweaks. This is a list of the ones I've been using.

I found most of these in the
ChrUbuntu communities on [Reddit] and [Google+].
If you know any other tips, leave a comment and I'll add them to the list.

[Reddit]: http://www.reddit.com/r/Chrubuntu
[Google+]: https://plus.google.com/communities/108883927831773328803

## Restore the trackpad:
1. Ctrl+Alt+T
* wget http://goo.gl/kz917j
* sudo bash kz917j
  * This can take a long time.

SOURCE: <https://plus.google.com/communities/108883927831773328803>

## Enable suspend:
1. Ctrl+Alt+T
* edit: /etc/default/grub
* comment out: GRUB_CMDLINE_LINUX_DEFAULT
* add: GRUB_CMDLINE_LINUX_DEFAULT="quiet splash add_efi_memmap boot=local noresume noswap i915.modeset=1 tpm_tis.force=1 tpm_tis.interrupts=0 nmi_watchdog=panic,lapic"
* close file
* sudo update-grub
* sudo update-grub2
* reboot

SOURCE: <http://realityequation.net/installing-elementary-os-on-an-hp-chromebook-14>

## Change the default screen brightness
1. Ctrl+Alt+T
* edit: /etc/rc.local
* add: echo 300 > /sys/class/backlight/intel_backlight/brightness
  * substitute any number up to 900 for "300" in the line above
  * <strong>To test different brightness levels</strong>
      1. echo 300 | sudo tee /sys/class/backlight/intel_backlight/brightness > /dev/null
      * repeat above command substituting numbers up to 900

SOURCE: <https://plus.google.com/communities/108883927831773328803>

## Remap the search key to shift key
1. Ctrl+Alt+T
* xmodmap -e "keycode 133 = Shift_L"
  * Unfortunately, this is a temporary fix. You'll need to rerun this command at every reboot.

SOURCE: <http://darknet.co.za/blog/?page=posts.2011&post=2011-02-HappyHackTipremapyourkeyboardbuttons.md>

## Disable trackpad while typing
1. Ctrl+Alt+T
* syndaemon -i 1 -K d
  * This will continue running in your Terminal window. Press Ctrl-C to stop it.

SOURCE: <http://askubuntu.com/questions/299868/disable-touchpad-while-typing-does-not-work>

## Mute the login sound
1. On the login screen, before you enter your User Name and Password,
go to the speaker icon in upper right-hand corner of your screen and select mute.
  * From now on the audio will be muted on the login screen. Audio will return to normal once you're logged in.

SOURCE: <http://askubuntu.com/questions/24946/how-do-i-disable-the-drum-beat-sound-on-the-login-screen>
