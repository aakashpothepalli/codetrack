# CodeTrack <img src="https://user-images.githubusercontent.com/19583729/117125699-82cc9c80-adb7-11eb-936e-f709fc2e9769.png" align="right" height=50/>

A lightweight online IDE built for competitive coding.

![ct1](https://user-images.githubusercontent.com/19583729/117126598-99272800-adb8-11eb-9de7-0157f913ec67.png)


## Features 

1) Parse problem automatically from CodeForces

![image](https://user-images.githubusercontent.com/19583729/117128437-05a32680-adbb-11eb-8bfe-8d91f9dfe37b.png)


2) Snippets

![image](https://user-images.githubusercontent.com/19583729/117128512-24092200-adbb-11eb-90d4-3329bd4ac2fd.png)

3) Auto Test Cases checker

![image](https://user-images.githubusercontent.com/19583729/117128556-34b99800-adbb-11eb-8094-685bfff33878.png)

4) Default Template

![image](https://user-images.githubusercontent.com/19583729/117128834-8c580380-adbb-11eb-8e7f-2c095907ea28.png)


5) Dark Mode 🌑

![ct2](https://user-images.githubusercontent.com/19583729/117126603-9a585500-adb8-11eb-9ba3-30a0c037fb8c.png)


## Endpoints
| Endpoint           | Type |Params | Description                                |
|--------------------|------|-------|--------------------------------------------|
| /api/cfparseproblem | GET  |`id` (eg:1152a) |Parses the given Codeforces problem using `id`|
| /api/runcode        | POST | `{code,input}` |Runs your C++ Code and returns the output|

**Give it a 🌟 if you liked it**

