---
title: "Data Types"
url: /refguide8/data-types/
category: "App Modeling"
weight: 60
tags: ["studio pro"]
#If moving or renaming this doc file, implement a temporary redirect and let the respective team know they should update the URL in the product. See Mapping to Products for more details.
---

{{% alert color="info" %}}
<img src="/attachments/china.png" class="d-inline-block" /> For the Simplified Chinese translation, click [中文译文](https://cdn.mendix.tencent-cloud.com/documentation/refguide8/data-types.pdf).
{{% /alert %}}

## 1 Introduction

Throughout Studio Pro the same set of data types are used. The exception is the type of [attributes](/refguide8/attributes/), which is more specific with regard to storage in the database. In general, an attribute type maps to the data type with the same name. The exceptions are mentioned in the table below.

## 2 Data Types Supported

Mendix supports the following data types:

| Name | Description | Examples |
| --- | --- | --- |
| Boolean | A truth value. | `true` and `false` |
| Binary | Binary data such as files and images. |   |
| Date and time | A point in time consisting of a date and a time component accurate up to milliseconds. | Thursday, 12 February 2015, 14:50:36 |
| Decimal | A high-precision fractional number. The Decimal type can be used for high-precision calculations. Use this type to represent amounts of money for example. A Decimal can have up to 20 digits before the decimal point, and up to 8 after. | 3.14, 738000000000.00000001 |
| Enumeration | One of the values of the given [enumeration](/refguide8/enumerations/). | Red, Green, Blue; Todo, Running, Done |
| Integer/Long | A whole number between -(2^63) and 2^63 - 1. The attribute types AutoNumber, Integer and Long map to this data type. | -42, 0, 123 |
| List | A list of objects of a specific [entity](/refguide8/entities/). |   |
| Nothing | No value. Can only be used as the return type of a [microflow](/refguide8/microflows/). |   |
| Object | A single object of a specific [entity](/refguide8/entities/). |   |
| String | A piece of text that can contain letters, numbers, spaces and other characters. The attribute types **String** and **Hashed string** both map to this data type. | 'Hello World!'; 'Desiderius Erasmus' |

If you want to change data from one type to another (for example, to display a number as part of a message in a text box) you will usually need to use an expression to do this. See [Expressions](/refguide8/expressions/) for more information on what is available.

An exception is converting an Integer/Long to a Decimal, where conversion is done implicitly if you provide an Integer/Long where a Decimal is expected.