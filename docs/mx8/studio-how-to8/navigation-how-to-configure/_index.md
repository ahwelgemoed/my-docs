---
title: "Configure a Navigation Bar"
url: /studio-how-to8/navigation-how-to-configure/
description: "This how-to describes the process of configuring a navigation bar in Mendix Studio."
weight: 15
tags: ["studio", "navigation", "how to", "navigation bar"]
#If moving or renaming this doc file, implement a temporary redirect and let the respective team know they should update the URL in the product. See Mapping to Products for more details.
---

## 1 Introduction

This how-to explains how to configure a navigation bar for your app such as creating menu items and sub-items. 

This how-to will teach you how to do the following:

* Setting a page as home page
* Create new menu bar items and sub-items

This how-to describes the following use case: 

You would like to configure a menu bar for your app. 

In Studio, the navigation bar is build in most page templates and is available on pages either as a sidebar or top bar. The configured menu bar will look the following way:

{{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/navigation-previewed.png" alt="Configured Menu" >}}

Currently you have a page called **Home_web** that is set as a home page by default. Your navigation document currently looks the following way:

{{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/navigation-default.png" alt="Navigation Default" >}}

You have several pages that you would like to add to the navigation:

* **Employees** – a page that lists all employees in your company and should be a home page

* **New_Employee** – a page for creating a new employee 

* **Job_Details** – contains a list with such details as employee's position, department, income; you would like to keep this page together with other two pages listed below under one menu item called  **Employee_Details** 

* **Personal_Info** – contains a list with personal employee information, such as full name, emergency contacts, address; should be a menu sub-item of the **Employee_Details** menu item

* **Documents** – contains a list with employee files, such as employment contract, medical insurance; should be a menu sub-item of the **Employee_Details** menu item

## 2 Prerequisites

Before starting this how-to, make sure you have completed the following prerequisites:

* Familiarize yourself with page terms and how to perform basic functions on pages. For more information, see [Pages](/studio8/page-editor/). 
* Familiarize yourself with navigation document terms. For more information, see [Navigation Document](/studio8/navigation/). 
* Familiarize yourself with the domain model terms and learn how to perform basic functions. For more information, see [Domain Model](/studio8/domain-models/).

## 3 Creating Menu Items and Sub-Items

### 3.1 Setting the Employees Page as the Home Page {#employees-page}

Currently the **Home_web** page is set as the home page for your app. However, you would like to set the **Employees** page as the home page instead. Do the following:

1. Click the **Navigation Document** icon in the left menu bar. 

2. Select the **Home** menu item:

    {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/navigation-default.png" alt="Default Navigation" >}} 
    
3. Open its properties. The property **Set as Homepage** is enabled by default for the **Home** menu item. You need to change the page that is currently selected in properties for it. Do the following:

    1.  Click the **Page** property to change the page that is currently set as home page:

        {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/home-page-properties.png" alt="Home Page Properties" >}}

    3. In the **Select Page** dialog box, choose **Employees** and click **Select**. 

        {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/select-page-dialog.png" alt="Select Page Dialog Box" >}}

You have changed the page that was selected as the home page by default and set the **Employees** page as the new home page for your app.

### 3.2 Creating Menu Item for the New Employee Page

The **New_Employee** page contains a form with the details of the new employee, this means that it contains a data view that expects an *Employee* object. Thus, when creating a menu item for it, you need to pass this object.

To create the menu item for the **New_Employee** page, do the following:

1. Click a plus at the bottom of the navigation tree to create a menu item:

    {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/adding-menu-item.png" alt="Adding Menu Item"   width="350"  >}}

2. Open the new menu item properties and do the following:

    1.  Set the **On Click Action** to **Page**.
        
    2. Toggle the **Create Object** option to pass the *Employee* object to the page.

    3. Click the **Entity** property to set the needed entity.

        {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/create-object.png" alt="Create Object" >}}

    4. In the **Select Entity** dialog box, choose **Employee** and click **Select**.

    5. Click the **Page** property.

    6. In the **Select Page** dialog box, choose **New_Employee** page and click **Select**:

         {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/select-new-employee-page.png" alt="Select New Employee Page" >}}
    
    7. In the **Caption** property, delete the *Navigation item* caption and type in *New Employee*. 
    
    8. Click the **Icon** property to set the icon for the menu item.
    
    9. In the **Select icon** dialog box, search for the *plus* icon and click **Select**:
    
         {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/plus-icon.png" alt="Select Plus Icon" >}}

Good job! You have added a menu item for the **New Employee** page to your navigation:

{{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/new-menu-item-created.png" alt="New Menu Item Created" >}}

Click **Preview** in the upper-right corner to [preview your app](/studio8/publishing-app/) and test how the navigation menu looks like:
{{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/previewed-menu-items.png" alt="Previewed Menu Items" >}}

### 3.3 Create a Menu Item for the Employee_Details Page and Configuring Its Sub-Items

You would like to place **Job_Details**, **Personal_Info**, and **Documents** pages under one menu-item named **Employee Details**, which means that they will be opened by menu sub-items. 

First, you need to create the menu item that will encompass three menu sub-items. Do the following:

1. Click a plus at the bottom of the navigation tree to create a menu item.

2. Open the new menu item properties and do the following:

    1. In the **Caption** property, delete the *Navigation item* caption and type in *Employee Details*. 
    2. Click the **Icon** property to set the icon for the menu item.
    3. In the **Select icon** dialog box, search for the *user* icon and click **Select**.

3. Click a plus *next to* the **Employee Details** menu item to create a sub-item for it:

    {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/creating-menu-sub-item.png" alt="Creating Menu Sub-Item" >}}

4. Open its properties and do the following:

    1. Set the **On Click Action** to **Page**.
    
    2. Click the **Page** property.
    
    3. In the **Select Page** dialog box, choose **Job_Details** page and click **Select**.
    
    4. In the **Caption** property, delete the *Navigation item* caption and type in *Job Details*:
    
        {{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/job-details-menu-item-properties.png" alt="Properties of Job Details Menu Sub-Item" >}}
    
    5. Repeat steps 1-4 to create a menu sub-item to open the **Personal_Info** page and name this sub-item *Personal Info*.  
    
    6. Repeat steps 1-4 to create a menu sub-item to open the **Documents** page and name this sub-item *Documents*. 
    
    7. The order of sub-items looks the following way now: **Documents**, **Personal Info**, **Job Details**. Drag and drop them to rearrange the order in the following way: **Job Details**, **Personal Info**, **Documents**.  

You have configured the sub-menu items for the **Employee Details** menu item.

Congratulations! You created and configured navigation for your app:

{{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/configured-navigation.png" alt="Configured Navigation" >}}

[Preview your app](/studio8/publishing-app/) to see how the navigation menu is displayed:

{{< figure src="/attachments/studio-how-to8/navigation-how-to-configure/navigation-previewed.png" alt="Previewed Navigation" >}}

