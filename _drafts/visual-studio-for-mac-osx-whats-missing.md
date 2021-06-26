---
title: Visual Studio for Mac OSX - What's Missing?
author: Scott McGrath
header_image:
  file: visual-studio-for-mac.jpg
  caption:
    credit:
      name: C.P.Storm
      url: https://www.flickr.com/photos/cpstorm/
    license:
      type: Creative Commons
      url: https://creativecommons.org/licenses/by/2.0/
    source: Flickr
    title: Broken
    url: https://www.flickr.com/photos/cpstorm/879782403/in/faves-35579269@N05/
layout: post
published: true
---

I prefer macOS for software development. Some great dev tools are built right into the OS,
and many other compatible applications are available to download and install. 
Even Microsoft provides some tools, languages and frameworks for macOS.

One such tool is 
[Visual Studio](https://visualstudio.microsoft.com/vs/mac/),
a code editor that provides some
[essential features for .NET development](https://visualstudio.microsoft.com/vs/features/net-productivity/).
Unfortunately, the Mac version is incomplete, compared the original Windows version.
Most .NET tutorials assume this missing functionality is available by default.
This can lead to a lot of false starts and frustrating moments in the learning process.

Below is a list of work arounds I've found to get the job done on a Mac.

<hr />

## Local SQL Server

In VS for Windows, you can create and query local database tables with 
[SQL Server Express LocalDB](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver15)
and 
[SQL Server Object Explorer](https://docs.microsoft.com/en-us/sql/ssdt/how-to-connect-to-a-database-and-browse-existing-objects?view=sql-server-ver15).

### **Mac Alternatives:** 
  - [Docker + SQL Server](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash)
  - [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15#macos-install)

Bonus Tip: [Docker + SQL Server "Connect String"](https://stackoverflow.com/questions/45712122/connection-string-for-sqlserver-in-docker-container/53702630#answer-65324761)

<hr />

## EF Core Database Migrations

In VS for Windows, you can run 
[EF Core migrations](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=vs) 
using the 
[Package Manager Console](https://docs.microsoft.com/en-us/ef/core/cli/powershell).

### **Mac Alternatives:** 
  - [.NET Core CLI](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)

<hr />

## Scaffold Identity

In VS for Windows, you can use 
[Solution Explorer](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-5.0&tabs=visual-studio#scaffold-identity-into-an-empty-project)
to add 
[ASP.NET Core Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-5.0&tabs=visual-studio).

### **Mac Alternatives:** 
  - [.NET Core CLI](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/scaffold-identity?view=aspnetcore-5.0&tabs=netcore-cli#scaffold-identity-into-an-empty-project)
  
<hr />

## Editor Extensions

[Extensions allow users to add extra features](https://marketplace.visualstudio.com/vs)
to the editor. For the most part, Visual Studio extensions are only available for Windows.

Oddly enough, Microsoft's free open-source editor,
[Visual Studio Code](https://code.visualstudio.com/),
does support cross-platform extensions.
If you need these features, you can load a project in a separate
VS Code window, and still have it loaded in Visual Studio as well.

Bonus - Cool Extensions: 
[Emmet](https://code.visualstudio.com/docs/editor/emmet),
[VSCodeVim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
  
<hr />

## Bonus Links

  - [Mac Keyboard Shortcuts](https://docs.microsoft.com/en-us/visualstudio/mac/keyboard-shortcuts?view=vsmac-2019)
  - [Secret Manager](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=linux#secret-manager)

