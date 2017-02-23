---
layout: post
title: "Setting up VIM for Javascript development"
date: 2016-09-04 21:49:41 -0500
comments: true
categories: 
---

For many, VIM is the ultimate text editor and there are many attempts to bring it's editting prowess to a wide variety of editors. Unfortunately, few understand the power of VIM's plugin system and the ability to get most of the features of your typical IDE in VIM itself. At the end of this guide, you should have proper autocompletion for your javascript files, jump to definition, linting and syntax checking all from your favorite text editor. <!--more-->There are some prerequisites, however. We assume that you have:

A. A computer setup with Neovim (a good initial guide on setup can be found [here](http://veelenga.com/editors/how-to-start-using-neovim-instead-of-vim/))
B. Neovim package installed from python [following the guide from here](https://github.com/neovim/python-client)
C. A recent version of Node (At the time of this guide, Node was at v4.5.0 for LTS and 6.5.0 for current, but anything recent should work)
D. A basic knowledge of how to configure Neovim

tl;dr - you can look at the config at the bottom of this post for a minimal drop in configuration for your neovim

## 1. A quick introduction to Vim-Plug

If you've never handled VIM's plugin system before it can be quite daunting. Luckily for us, there are a number of projects that make plugin management easy for the typical user. Vim Plug one of the more popular plugin managers that aims to be minimal, universally quick and easy to setup. It also has other more advanced features such as the ability to lazy load plugins until needed, running functions after a plugin installation and more which can be found [in it's documentation](https://github.com/junegunn/vim-plug). To begin using vim-plug, we'll first create a basic init.vim in ~/.config/nvim/init.vim that has the following contents

```
" Install Vim Plug if not installed
if empty(glob('~/.config/nvim/autoload/plug.vim'))
  silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall
endif

call plug#begin()


call plug#end()
```

This will automatically download and install vim-plug for you on vim launch. Plugins are added in between the calls to `plug#begin()` and `plug#end()` and adding github shorthand that looks like `Plug 'ternjs/tern_for_vim'` which after running `:PlugInstall` would fetch the vim plugin hosted at https://github.com/ternjs/tern_for_vim. We'll go ahead and add that to our configuration now so our init.vim should look like this:

```
" Install Vim Plug if not installed
if empty(glob('~/.config/nvim/autoload/plug.vim'))
  silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall
endif

call plug#begin()

Plug 'ternjs/tern_for_vim', { 'do': 'npm install && npm install -g tern' }

call plug#end()
```

You'll notice that we run some commands here on your computer for you, installing both the vim plugin's dependencies and a global tern package. This will help keep the plugin in sync with the global ternjs package installed on your computer and is just a hint of the power of vim-plug.

## 2. Deoplete and autocompletion

The global tern package is needed because it's a generic server that all text editors can plug into, which the vim side of things being a client package that communicates with the server. This also allows us to configure the server on both a global scale and on a local scale. For now, we'll configure it globally in a generic way for maximum benefit. Create a file in your home directory with the name .tern-config with the following contents:

```
    {
      "plugins": {
        "node": {}
      }
    }
```

By default, this assumes ES6 and a few other defaults. It can be configured on a per project basis by adding a .tern-project in the root of the project with the configuration options found at [their documention](http://ternjs.net/doc/manual.html). Now that is setup, you should be able to open vim and run the `:PlugInstall` command to install your plugin. Then you can go into a javascript project and type `<C-x> <C-o>` to get completions on your javascript candidates.

That's all fine and good, but, this is only scratching the surface of Neovim's powers. The Omnicompletion method we just set up blocks Neovim and isn't automatically triggered during typing like we might expect from a full blown IDE. To solve this, we're going to install Deoplete and some other plugins to get our full IDE abilities turned on. Let's add these plugins now along with some basic config to get them working. Your config should look like this now:

```
    " Install Vim Plug if not installed
    if empty(glob('~/.config/nvim/autoload/plug.vim'))
      silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
        \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
      autocmd VimEnter * PlugInstall
    endif

    call plug#begin()


    function! DoRemote(arg)
      UpdateRemotePlugins
    endfunction
    Plug 'Shougo/deoplete.nvim', { 'do': function('DoRemote') }

    Plug 'ternjs/tern_for_vim', { 'do': 'npm install && npm install -g tern' }
    Plug 'carlitux/deoplete-ternjs'


    call plug#end()

    let g:deoplete#enable_at_startup = 1
    let g:deoplete#enable_ignore_case = 1
    let g:deoplete#enable_smart_case = 1
    let g:deoplete#enable_camel_case = 1
    let g:deoplete#enable_refresh_always = 1
    let g:deoplete#max_abbr_width = 0
    let g:deoplete#max_menu_width = 0
    let g:deoplete#omni#input_patterns = get(g:,'deoplete#omni#input_patterns',{})

    let g:tern_request_timeout = 1
    let g:tern_request_timeout = 6000
    let g:tern#command = ["tern"]
    let g:tern#arguments = ["--persistent"]
```

Deoplete is a generic autocomplete plugin that allows others to hook into it and provide completions for candidates on screen. It comes preconfigured with file path completion, ctags completion and for strings that appear in each of your vim buffers. deoplete-ternjs is another package that plugs into deoplete that provides completions using the ternjs server. After running `:PlugInstall` again, you should have a fully installed fuzzy completion engine for vim. You can try it out by typing following a `.` should trigger autocompletion for whatever object or function you're calling.

The other bits of configuration unlock a bit of the power of deoplete. It enables it to start when vim does, enable sane autocompletion based on the cases of your candidates among other things that can be found in the [deoplete docs](https://github.com/Shougo/deoplete.nvim/blob/master/doc/deoplete.txt)

But we can still do better. In addition to the candidate completions generated by ternjs, we can also get candidate completion by typescript language services, the same tools used by popular IDEs such as Visual Studio. To do this, we'll need to add a few more plugins so our init.vim should look like this:

```
    " Install Vim Plug if not installed
    if empty(glob('~/.config/nvim/autoload/plug.vim'))
      silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
        \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
      autocmd VimEnter * PlugInstall
    endif

    call plug#begin()

    function! DoRemote(arg)
      UpdateRemotePlugins
    endfunction
    Plug 'Shougo/deoplete.nvim', { 'do': function('DoRemote') }


    "Javascript Plugins
    Plug 'carlitux/deoplete-ternjs'
    Plug 'ternjs/tern_for_vim', { 'do': 'npm install && npm install -g tern' }

    "Typescript Plugins
    Plug 'Shougo/vimproc.vim', { 'do': 'make' }
    Plug 'Quramy/tsuquyomi', { 'do': 'npm install -g typescript' }
    Plug 'mhartington/deoplete-typescript'

    call plug#end()


    let g:deoplete#enable_at_startup = 1
    let g:deoplete#enable_ignore_case = 1
    let g:deoplete#enable_smart_case = 1
    let g:deoplete#enable_camel_case = 1
    let g:deoplete#enable_refresh_always = 1
    let g:deoplete#max_abbr_width = 0
    let g:deoplete#max_menu_width = 0
    let g:deoplete#omni#input_patterns = get(g:,'deoplete#omni#input_patterns',{})
    call deoplete#custom#set('_', 'matchers', ['matcher_full_fuzzy'])

    let g:tern_request_timeout = 1
    let g:tern_request_timeout = 6000
    let g:tern#command = ["tern"]
    let g:tern#arguments = ["--persistent"]
    let g:deoplete#sources#tss#javascript_support = 1
    let g:tsuquyomi_javascript_support = 1
    let g:tsuquyomi_auto_open = 1
    let g:tsuquyomi_disable_quickfix = 1

```

This installs two major plugins: Tsuquyomi and deoplete-typescript. Both offer autocompletion based on typescript language services. The difference between them is Tsuquyomi provides some additional IDE features but only provides an omnifunc like tern_for_vim did. deoplete-typescript provides completions like deoplete-ternjs but without the IDE features. I generally like to run this in parallel with ternjs because they seem to offer different sets of completions for my javascript candidates and so fill in the gaps of one another. You should really check out [tsuquyomi's docs](https://github.com/Quramy/tsuquyomi/blob/master/doc/tsuquyomi.txt) to ensure you're getting the most out of it such as automatic importing, but I won't go into detail about that here. All you need to know for now is that the typescript server also needs configuration like ternjs did and is configured indepedently of vim. Each project you work on needs a basic config like so: 

```
{
  "compilerOptions": {
    "target": "ES6"
  },
  "exclude": [
    "node_modules"
  ]
}
```

This will tell the typescript compiler that it's targeting ES6 and will exclude the node_modules directory for it's processing. If you're using Typescript 2.0 (in RC stage at the time of this post) you can easily install typings for some of your libraries by running `npm install --save @typings/my_library_here` that will be automatically picked up by the compiler and used to provide completions for complex libraries. 


## 4. Linting and syntax checking

Another major missing feature is automatic linting. On Neovim, we can use neomake. Simply drop into your init.vim with the following configurations to get linting for your favorite tool as long as it is in your path. To enable or disable a linter, just add this line and append or remove the ones you want

```
let g:neomake_javascript_enabled_makers = ['eslint']
```

For some additional benefits, we'll run Neomake on every file save and configure the warning signs to our liking:

```
autocmd! BufWritePost * Neomake
let g:neomake_warning_sign = {
  \ 'text': '?',
  \ 'texthl': 'WarningMsg',
  \ }

let g:neomake_error_sign = {
  \ 'text': 'X',
  \ 'texthl': 'ErrorMsg',
  \ }
```

This will show signs in your vim gutter to show where the syntax and linting errors are for your project.


## 5. CTags

Ctags is a tool that outputs a tags file that can then be read by VIM for jumping to definition and other cool tricks. Ctags is pretty universally installable by most OS's, but traditionally it has had rather poor support for Javascript. We'll start by installing [universal ctags](http://docs.ctags.io/en/latest/) which is simply a fork of the exuberant ctags project with support for the latest version of Javascript. We'll also install vim-gutentags to enable automatic generation of ctags by VIM upon opening a project. Drop this in your plugins section of your init.vim:

```
Plug 'ludovicchabant/vim-gutentags'
```
After running `:PlugInstall` and opening a project, you should find a tags file in the root of your project. To jump to definition using ctags just hover over a defined variable or import statement and type `<C-]>`. 


## 6. Conclusion

This is just scratching the surface of VIM and Neovim's power and are just the plugins needed to get IDE functionality specific to Javascript. Hopefully this will keep you away from the big bulky IDE that is often used by programmer who feel that VIM is just not enough. The full configuration from this guide can be seen below

```
    " Install Vim Plug if not installed
    if empty(glob('~/.config/nvim/autoload/plug.vim'))
      silent !curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs
        \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
      autocmd VimEnter * PlugInstall
    endif

    call plug#begin()

    function! DoRemote(arg)
      UpdateRemotePlugins
    endfunction
    Plug 'Shougo/deoplete.nvim', { 'do': function('DoRemote') }
    Plug 'neomake/neomake', { 'on': 'Neomake' }
    Plug 'ludovicchabant/vim-gutentags'


    "Javascript Plugins
    Plug 'pangloss/vim-javascript'
    Plug 'carlitux/deoplete-ternjs'
    Plug 'ternjs/tern_for_vim', { 'do': 'npm install && npm install -g tern' }

    "Typescript Plugins
    Plug 'Shougo/vimproc.vim', { 'do': 'make' }
    Plug 'Quramy/tsuquyomi'
    Plug 'mhartington/deoplete-typescript'

    call plug#end()

    let g:deoplete#enable_at_startup = 1
    let g:deoplete#enable_ignore_case = 1
    let g:deoplete#enable_smart_case = 1
    let g:deoplete#enable_camel_case = 1
    let g:deoplete#enable_refresh_always = 1
    let g:deoplete#max_abbr_width = 0
    let g:deoplete#max_menu_width = 0
    let g:deoplete#omni#input_patterns = get(g:,'deoplete#omni#input_patterns',{})
    call deoplete#custom#set('_', 'matchers', ['matcher_full_fuzzy'])

    let g:tern_request_timeout = 1
    let g:tern_request_timeout = 6000
    let g:tern#command = ["tern"]
    let g:tern#arguments = ["--persistent"]
    let g:deoplete#sources#tss#javascript_support = 1
    let g:tsuquyomi_javascript_support = 1
    let g:tsuquyomi_auto_open = 1
    let g:tsuquyomi_disable_quickfix = 1

    autocmd! BufWritePost * Neomake
    let g:neomake_warning_sign = {
      \ 'text': '?',
      \ 'texthl': 'WarningMsg',
      \ }

    let g:neomake_error_sign = {
      \ 'text': 'X',
      \ 'texthl': 'ErrorMsg',
      \ }
```
