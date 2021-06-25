---
title: Visual Studio for Mac OSX - What's Missing?
author: Scott McGrath
header_image:
  file: swiper-js-polaroids.jpg
  caption:
    credit:
      name: Virginia rm
      url: https://www.flickr.com/photos/virgirm/
    license:
      type: Creative Commons
      url: https://creativecommons.org/licenses/by/2.0/
    source: Flickr
    title: Polaroid photos
    url: https://www.flickr.com/photos/virgirm/3787704589/in/faves-151359080@N04/
layout: post
published: true
---

I'm a macOS user. I write code on MacBooks, and I was heppy to find a version of 
[Visual Studio for macOS X](https://visualstudio.microsoft.com/vs/mac/),
because it has some
[essential features for Microsoft .NET development](https://visualstudio.microsoft.com/vs/features/net-productivity/).

Unfortunately, the Mac version is missing some key features from the Windows version.
Most .NET tutorials and videos assume this functionality is available.
This can lead to false starts and frustrating moments in the learning process.

Here is a list of tools and techniques I've found to fill the gaps.

<hr />
## Local SQL Server
On Windows, you can create and query local database tables with 
[SQL Server Express LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15)
and 
[SQL Server Object Explorer](https://docs.microsoft.com/en-us/sql/ssdt/how-to-connect-to-a-database-and-browse-existing-objects?view=sql-server-ver15).

### **Mac Alternatives:** 
  - [Docker + SQL Server](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash)
  - [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15#macos-install)

<hr />
## EF Core Database Migrations
On Windows, you can run EF Core migrations directly in VS using
[Package Manager Console](https://docs.microsoft.com/en-us/ef/core/cli/powershell).

### **Mac Alternatives:** 
  - [.NET Core CLI](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)