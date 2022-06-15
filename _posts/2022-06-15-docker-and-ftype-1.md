---
layout: post
title:  "Docker and `ftype = 1`"
tags: docker-pills docker
---

Did you know that Docker [needs special filesystem](https://docs.docker.com/storage/storagedriver/overlayfs-driver/) to properly work?

I didn't, until I face this problem:
```
WARNING: overlay: the backing xfs filesystem is formatted without d_type support, > which leads to incorrect behavior.
Reformat the filesystem with ftype=1 to enable d_type support.
Running without d_type support will not be supported in future releases.
```

Ouch.

Now you have a very few options to overcome this error. If you can, you should reformat your drive with a filesystem
with `ftype=1` enabled.

But if you are like me and didn't want to reformat your drive just to try out some Dockerfile in a maybe-too-old-machine, well,
you can use this little trick: format a single file with the correct filesystem, mount that file as a directory, instruct Docker to use 
that directory as the storage dir.

```shell
# create a 5GB file
$ fallocate -l 5G docker.fs

# format with an ftype=1 filesystem
mkfs.ext4 -c docker.fs

# mount the file as a directory
sudo mount -t ext4 -o loop docker.fs /mnt/docker 
```

And as a last thing, you need to tell Docker to use `/mnt/docker` as the Root of the Docker Runtime: edit the file `/lib/systemd/system/docker.service` by adding the option `-g /mnt/docker` to the command `dockerd` in the `ExecStart` configuration.

Now you have enough room to run some little Docker images.

