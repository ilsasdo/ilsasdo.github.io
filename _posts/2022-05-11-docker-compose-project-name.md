---
layout: post
title:  "Project Name in Docker Compose"
tags: docker-pills docker-compose
---

# Project Name in Docker Compose

When you run `docker-compose`, automatically it takes the name of the directory you are in and assign it as a *Project Name*.

This means that if you run *another* `docker-compose` in *another* directory with the same name, it will starts all the services described by the `docker-compose.yml` in **both** directories.

There are a few solutions to overcome this:

1. rename the content directory with different names
2. add the argument `-p [project_name]` in the `docker-compose` command
3. **(my favourite)** add the environment variable `COMPOSE_PROJECT_NAME=[project name]` in an `.env` file next to the `docker-compose.yml`

My favourite solution is the third option, so I don't have to remember nothing and I can commit this file to git.


