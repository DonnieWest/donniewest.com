---
layout: post
title: "Supercharged VIM built from source"
date: 2014-12-26 22:03:10 -0600
comments: true
categories: Vim, Programming
---

There's a reason programmers love VIM: infinite customization that is consistent across all of your projects. VIM is capable of being molded to your particular tastes and workflow, so why limit oneself with the anemic VIM that's bundled with your OS? Let's supercharge our VIM with the latest the text editor has to offer with the language and plugin support that we crave.[^1]

*Note: While I'm sure the following can be adapted to another distro, I assume you're running a newish version of Ubuntu and is tested against Ubuntu 14.04 and 14.10. The same can be said for RVM - while this guide uses RVM, you should be able to adapt it for an alternative ruby manager*

<!--more-->

## 1. Setting up your Machine

**Install VIM dependencies**


Here we're installing the dependencies for a known version of VIM, then install libraries for features it's lacking and a few build tools along with curl. Removing the system version of VIM will ensure no conflicts arise later. You can replace vim-gnome with vim-nox if you're not interested in VIM's GTK integration.


    sudo apt-get build-dep vim-gnome
 
    sudo apt-get install liblua5.1-dev luajit libluajit-5.1 libncurses5-dev mercurial checkinstall curl

    sudo apt-get remove vim vim-common gvim vim-runtime 

**Install RVM**[^2]


You can skip this step if you already have RVM installed, but this should install the latest RVM with the latest version of Ruby.
    
    gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3

    
    \curl -sSL https://get.rvm.io | bash --ruby


**Symlink Correct spots**

When VIM is being compiled, it pulls libruby first from /usr/lib/x86_64-linux-gnu before checking elsewhere. The following is necessary to ensure VIM will use your RVM ruby instead of any system ruby versions that are installed (and also to prevent it from crashing on start).[^3] The part that is awesome here is that the bundled VIM-ruby packages within VIM will now use your RVM ruby and the current gemset. 

    ln -s ~/.rvm/rubies/default/lib/libruby.so /usr/lib/x86_64-linux-gnu/libruby.so
    ln -s ~/.rvm/rubies/default/lib/libruby.so.2.2 /usr/lib/x86_64-linux-gnu/libruby.so.2.2

Unfortunately, VIM doesn't detect lua where Ubuntu installs it. Here's a quick workaround to ensure VIM finds lua correctly. [^4]

    sudo mkdir /usr/include/lua5.1/include
    sudo mv /usr/include/lua5.1/*.h /usr/include/lua5.1/include/
    
    sudo ln -s /usr/bin/luajit-2.0.0-beta9 /usr/bin/luajit

## 2. Getting the Code

VIM is hosted on Google Code using mercurial, so we'll get the code from there.

    cd ~
    hg clone https://code.google.com/p/vim/
    cd vim


## 3. Compiling it

Here's where the magic happens. If there's anything missing from above, you should get a quick failure so you're not missing out on anything. Checkinstall also gives us the added benefit of removing VIM with apt-get.

    ./configure --with-features=huge \
                --enable-rubyinterp \
                --with-ruby-command=$HOME/.rvm/rubies/default/bin/ruby \
                --enable-pythoninterp \
                --enable-perlinterp \
                --enable-luainterp \
                --with-lua-prefix=/usr/include/lua5.1 \
                --with-luajit \
                --enable-cscope \
                --prefix=/usr \
                --enable-largefile \
                --with-x \
                --enable-fontset \
                --enable-multibyte \
                --enable-gui=auto \
                --disable-netbeans \
                --enable-fail-if-missing
    
    make VIMRUNTIMEDIR=/usr/share/vim/vim74
    sudo checkinstall

## 4. Set it as Default

Set it as your default editor and default VIM

    sudo update-alternatives --install /usr/bin/editor editor /usr/bin/vim 1
    sudo update-alternatives --set editor /usr/bin/vim
    sudo update-alternatives --install /usr/bin/vi vi /usr/bin/vim 1
    sudo update-alternatives --set vi /usr/bin/vim

## 5. Conclusion

Now you can enjoy supercharged VIM - the full language and plugin support that it offers with the added benefit of using the latest ruby available on your system. 




[^1]: Most of the credit to this guide belongs to [YouCompleteMe's Wiki](https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source) and [this gist](https://gist.github.com/jdewit/9818870). I mainly just merged instructions from the two and worked out kinks 
[^2]:Up to date instructions at [RVM's website](https://rvm.io/rvm/install)
[^3]: If you want a different Ruby than 2.2, just symlink the appropriate libruby version and set it as default in RVM
[^4]: Ubuntu 14.10 and up bundle Lua 5.2, however, Luajit isn't supported and Lua 5.1 seems to work just fine for my purposes and allows this guide to have *some* backwards compatibility.
