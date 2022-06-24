---
title: "Troubleshoot Network Issues for Connecting to the Team Server"
url: /howto/collaboration-requirements-management/troubleshoot-network-issues-for-team-server/
category: "Collaboration"
weight: 14
description: "Describes troubleshooting connection issues as well as the permissions and settings required to connect to the Team Server."
tags: ["Team Server", "network", "troubleshoot", "firewall"]
---

## 1 Introduction

Mendix Studio Pro needs to connect to the Team Server, where all your apps are stored. This document describes which permissions and settings are required to connect to the Team Server.

## 2 Troubleshooting Team Server App Network Settings

Being unable to download the Team Server app can indicate that the security configuration of your company network is blocking access to `https://home.mendix.com` and `https://teamserver.sprintr.com/`.

Team Server is implemented using Subversion and Mendix Studio Pro uses the HTTPS (TCP) protocol to communicate with that server. To access the Team Server from Studio Pro, the network at your location needs the following settings:

* The HTTPS port (TCP 443) needs to be open
* The HTTP port (TCP 80) needs to be open
* WebDAV (verbs within the HTTP protocol) needs to be enabled on any proxy server

Mendix Studio Pro connects to `https://teamserver.sprintr.com/` and with the domains shown in the diagram below over HTTPS on port 443. These domains should be added to the firewall white list:

{{< figure src="/attachments/howto/collaboration-requirements-management/troubleshoot-network-issues-for-team-server/networkaccessmendixplatform.jpg" alt="Domains home.mendix.com, cloud.mendix.com, and teamserver.sprintr.com need to be accessible on port 443 from your network" >}}

You can look up the IP address of `https://teamserver.sprintr.com/`.

{{% alert color="warning" %}}
Mendix reserves the right to change the IP address at any time and without notification to the customer. This could happen if Mendix moves to a different infrastructure, for example.
{{% /alert %}}

{{% alert color="info" %}}
Contact your network administrator and give them this information to allow them to configure your network (for example, firewall, and proxy settings) correctly.
{{% /alert %}}

If this solution does not work, submit a request to [Mendix Support](https://support.mendix.com/).

## 3 Read More

* [Team Server](/developerportal/collaborate/team-server/)