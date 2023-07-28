---
title: 'Git and Github - Course Notes'
date: '2022-05-26'
image: 'post1.jpg'
excerpt: 'Some of my Git and Github notes!'
isFeatured: false
---

## Section 2: Intro to Git

**Git**

- Version control system. Software that tracks & manages changes to files over time.
- Git has a preference of 88%+, so it is the one to learn!
- Git helps track changes across files, compare versions of a project, time travel to old versions, revert to previous versions, collaborate and share changes, combine changes.

**Who uses Git?**

- Engineers & Coders. Tech-adjacent roles -- designers. Governments to manage drafting of laws. Scientists. Writers.

**Git vs Github -- difference?**

- Github is a service that hosts Git repos in the cloud and makes it easier to collaborate with other people.
- It's an online place to share work that is done using Git.

## Section 3: Installation & Setup

- Git is (primarily) a terminal tool.
- Popular GUIs for Git: Github Desktop, SourceTree, GitKraken, Ungit
- Git wants to run with a Unix based interface. Window uses the command prompt interface. Bash Shell is used on Linux / iOS. Windows users have to download Git Bash.
- Run `git config user.name` to see your Git username
- Run `config --global user.name "<name>"` to set your username.
- Run `git config user.email` to see your Git email address
- Run` config --global user.email "<email>"` to set your email address.

**Essential Terminal Commands**

- `ls`: Short for _List_ -- as in list the current directory's content)
  - `ls <folderName>`: List the content of the specified folder (Ex. while in Desktop directory: ls Courses/Git or ls "Courses/Git")
  - `ls -a`: Shows hidden files
- `start .` (Like Mac's "open ." command): Opens Windows Explorer for current directory
- `clear`: Clears the terminal
- `pwd`: _Print Working Directory_. Shows current directory (path to where you are)
- `cd`: _Change Directory_. (Example, from Desktop: cd Courses, or cd Courses/Git)
  - `cd ..`: Moves back a level
  - `cd -`: Navigates to the previous directory you were in
  - `cd /`: Navigates to the root directory
  - `cd ~`: Navigates to your home directory
- `touch <fileName.extension>`: Creates new file in current directory. Typically doesn't work in Windows:but seems to with Git Bash!
- `mkdir <folderName>`: _Make Directory_: Creates a folder with the specified name
- `rm <fileName.extension>`: _Remove_. Removes the file.
  - Permanently removes, no warnings or stashing in trash bin!
  - Cannot use rm to delete folders!
- `rm -rf <folderName>`: Removes a folder.
  - Not we still use the rm command, but with the -rf "flags".
  - r is "recursive", and f is "force"
  - (Can't currently be in the folder you're deleting?)

## Section 4: Very Basics of Git - Adding & Committing

**Topics In This Section:**

- What are Git Repos?
- Git Init. Git Status.
- The Committing Workflow.
- Git Add.
- Understanding the .git folder.
- Git Commit.
- Git Log.

Repository (repo): A Git workspace which tracks and manages files within a folder. Any time we want to use Git with a project, we need to create a new git repo.

git status: Command that gives info on the current status of a git repo and its contents. Very important command!

git init: Command that initializes a new repo. Before we can do anything git-related, we must init a repo! Do this once per project...
...Init the repo in the top-level folder containing your project. All files and sub-folders are tracked by the repo.
What's get init do? Basically creates a hidden .git directory. It's what holds all the git stuff for our project!

**IMPORTANT**: Do not init a repo inside of a repo! Before running git init, use get status to verify that you are not currently inside a repo already.

Committing: Creating a "checkpoint" in a repo -- a "commit". The most important git feature!
Isn't as simple as just saving current project -- there's intermediate step where we call out the particular changes that we want to include in our commit.
Example: We added 2 new features to a project, across 7 files. We can group the 1st 3 files (that deal with 1 specific feature) in one commit, etc.
Basic Git Workflow: 1) Work on Stuff (make new files, edit files, delete files, etc) => 2) Add Changes (group specific changes together, in preparation of committing),
=> 3)Commit (commit everything that was previously added).
Intermediate Commit Step -- git add:
Working Directory => git add => "Staging Area" => git commit => Repository
Working Directory: Location where we're actually creating and modifying our files.
Repository: Our .git folder. This is updated when a commit is made.
Staging Area: Intermediate area
git add: Highlight / select the changes we want to include in the upcoming commit.
Usage: git add file1 file2 file 3 etc. Use Git add to add specific files to the staging area. Separate files with spaces to add multiple at once.

- `git commit`: We use this command to actually commit changes from the staging area.

  - When making a commit, we should provide a commit message that summarizes the changes and works snapshot in the commit.
  - This uses your default editor, so not recommended at this point! Unless we already set up our default to VS Code.

- `git commit -m "my message"`: Easier since we don't have to configure an editor and does the commit and message as all one step.
- `git log`: Retrieves a log of the commits made for the repo. Shows author, date, commit message, and commit hash.

**VERY IMPORTANT** PRESS Q TO EXIT OUT OF GIT LOG

`git add .`: Stages ALL changes at once, rather than having to specify each file.
`git commit -a -m <"Message">`: This is a shorthand way to add ALL files for staging and commit in a single step.
`git commit -am <"Message">`: Similar to above -- can combine the -a and -m ! Make sure the files have been tracked by Git at least once, though.

## Section 5: Commits in Detail

\_ Git docs can be found at www.git-scm.com

**Keep your commits atomic**

- When possible, a commit should encompass a single feature, change, or fix. In other words, try to keep each commit focused on a single thing!
- This makes it much easier to undo or rollback changes later on. It also makes your code or project easier to review.

**Commit messages **

- Present-Tense, Imperative style? Past-Tense?
- Git docs say: Describe your changes in imperative mood, e.g. "make xyyzy do frotz" instead of "This patch makes xyzzy do frotz" or
  "I changed xyzzy to do frotz", as if you are giving orders to the codebase to change its behavior.
- Not too important -- just be consistent! Git by default uses Present-Tense Imperative Style.

To configure Git to use Visual Studio Code as its default editor: `git config --global core.editor "code --wait"`

- We can find this under the Git Commands - Setup and Config section on the Git doc site.

When doing a commit in VS Code (or other editor)...

- We save the file that it opens in the editor, then close out of it -- and the commit will be made!

**Closer look at git log**

- `--pretty[=<format>]`
- `--format=<format>`
  - Pretty-print the contents of the commit logs in a given format, where <format> can be one of online, short, medium, full, fuller, reference, email, raw, etc.
- Common git log flag is "--online" (which is shorthand for "--pretty=online --abbrev-commit")
- Usage: git log --online

**Amending Commits**

- If you made a commit and made a mistake (forgot to include file, typo in commit message, etc), you can "redo" the previous commit using the --amend option.
- This ONLY works on the PREVIOUS commit!
- `git commit --amend`: Allows you to redo the previous commit.

**Ignoring Files**

- We can tell Git which files and directories to ignore, using a .gitignore file. This is useful for: Secrets, API keys, credentials. OS files. Log files. Dependencies & packages.
- Create a file called .gitignore in the root of a repo. Inside the file, write patterns to tell Git which files & folders to ignore: <fileName>, or <folderName/>, or `*.png` will ignore all files with the .png extension.
- Online tools to help build proper .gitignore files, include: www.gitignore.io

## Section 6: Working w/ Branches

This section covers...

- Branching! What is Branching? Why use it?
- Understanding Git HEAD.
- Git Branch.
- Git Switch.
- Git Checkout.
- HEAD & Refs behind the scenes.
- Master vs. Main Branch.
- Deleting & Renaming Branches.

- Each commit has a unique hash. Each commit references at least one parent commit that came before it (except initial commit).
- Branches: Think of branches as alternative timelines for a project. They enable us to create separate contexts where we can try new things, or work on multiple ideas in parallel.
  - If we make changes on one branch, they do not impact the other branches (unless we merge the changes). Changes in one branch exist in isolation from other branches.
- In git, we are always working on a branch. The default branch is "master". This is being renamed to "main" to be more politically correct.
- What is (HEAD -> master)? We'll often come across the term HEAD in Git.
  - It's simply a pointer that refers to the current "location" in your repo. It's a reference to a branch pointer, and a branch pointer is where a branch currently is.
  - So far, HEAD always points to the latest commit you made on the master branch, but we'll soon see that we can move around and HEAD will change!
  - HEAD will point to the "tip" of your active branch. The tip is the latest commit in a given branch.
  - Essentially, each HEAD references a branch, and each branch is reference a commit (its corresponding tip).
- git branch: View your existing branches. The default branch in every git repo is master. Look for the \_ which indicates the branch you are currently on.
- git branch <branch-name>: Use this command to make a new branch BASED UPON the current HEAD.
  - This just creates the branch. It does not switch you to that branch (the HEAD stays the same).
- git switch <branch-name>: This is the new command to switch branches (used to be git checkout).
- git checkout <branch-name>: Historically, we used this command git switch <branch-name>. Still works. Does a lot more than just switching branches.
  - So the decision was made to add a standalone switch command which is much simpler.
- git switch -c <branch-name>: Use git switch with the -c flag to create a new branch AND switch to it -- all in one go! Remember -c as short for "Create".
- Must Stash or Commit your changes before switching to another branch! If a current branch's file may conflict with another, this is required.
  - However, if you, say, create a new file in your current branch that doesn't exist on another, and you switch to that other branch, you will not get any complaints about
    conflicts. The new file will essentially follow its way over to the branch you just switched to.

**Deleting & Renaming Branches**

- git branch -d <branch-name>: Deletes a branch. The branch must be fully merged in its upstream branch, or in HEAD if no upstream was set with --track or --set-upstream-to
  - (-d is shortcut for --delete)
  - (-D is shortcut for --delete --force)
  - Can't delete branch you're currently on. Warning if branch is not fully merged. Can you git branch -D if you want to delete irrespective of merged status.
- git branch -m: MOVE/rename a branch and the corresponding Reflogs. To rename, have to be ON the branch.
  - Example: git switch oldName followed by git branch -m newName

## Section 7: Merging Branches

This section covers...

- Fast Forward Merges.
- Git Merge & Merge Commits.
- Resolving Merge Conflicts.
- Using VS Code to Resolve Conflicts.

- Merging: Branching makes it super easy to work within self-contained contexts, but often we want to incorporate changes from one branch into another!
  - We can do this using the git merge command!
- Typically treat Main/Master branch as the most "pure" -- it should always work! So do experiments on "feature" branches, then merge into Master.
- Merge can be confusing, so remember: We merge BRANCHES, not specific commits. We always merge the current HEAD branch.
- To merge, just:
  1. Switch to or checkout the branch you want to merge teh changes into (the receiving branch).
  2. Use the git merge command to merge changes from a specific branch into the current branch.
- Simplest merge is a "Fast-Forward" merge. E.g. Master branch simply catches up on commits from another branch. No additional work on master branch before merge took place.
- Next simplest is when work is done on parallel branches, but they do not conflict with one another. In this case, a "merge commit" is generated.
  - Basically, Git just makes a commit for us on the recipient branch and prompt us for a commit message. Results in commit with multiple parents.
- Sometimes Git may not be able to automatically merge. This results in merge conflicts, which you need to manually resolve.
  - Git tells us the conflict. We go into the conflicted files and change them, with Git changing the contents of those files to indicate the conflicts in question.
  - Conflict Markers: The content from your current HEAD (branch you are trying to merge content into) is displayed between the <<<<< HEAD and ======
  - The content from the branch you are trying to merge from is displayed between the ===== and >>>>>> symbols
- Resolving Conflicts: Whenever we encounter merge conflicts, we can follow these steps to resolve them:
  1. Open up the file(s) w/merge conflicts
  2. Edit the file(s) to remove the conflicts. Decide which branch's content you want to keep in each conflict. Or keep the content from both.
  3. Remove the conflict "markers" in the document
  4. Add your changes and then make a commit!

## Section 8: Comparing Changes w/ Git Diff

This section covers...

Git Diff! Reading Diffs.
Git Diff Basics.
Diffing Branches.
Diffing Commits.
Diffing Specific Files.
Git diff --staged

**Git Diff**

- We can use the git diff command to view changes between commits, branches, files, our working directory, and more!
- We often use git diff alongside commands like git status and git log, to get a better picture of a repo and how it has changed over time.
- `git diff`: Without additional options, git diff lists all the changes in our working directory that are NOT staged for the next commit.

  - Compares Staging Area & Working Directory

- Compared Files: For each comparison, Git explains which files it is comparing. Usually this is 2 versions of the same file. It declares one as "A" and other as "B"
  -Chunks: A diff won't show the entire contents of the file, but instead "chunks" that were modified.

  - A chunk includes some unchanged lines before and after to provide context. Starts with a header
  - Chunk Header: Two "@" signs on either side. Example: @@ -3,4 +3,5 @@ means:
    - From file a, 4 lines are extracted starting from line 3 (minus for file a)
    - From file b, 5 lines are extracted starting from line 3 (plus for file b)

- git diff HEAD: This command lists all changes in the working tree since your last commit. Includes staged AND unstaged changes since HEAD.
- git diff --staged, or git diff --cached: Will list the changes between the staging area and our last commit.
  - "Show me what will be included in my commit if I run git commit right now".
  - "What is the difference between my last commit and my staging area?"

Recap: All UNSTAGED => git diff ALL STAGED => git diff --staged ALL (STAGED & UNSTAGED) => git diff HEAD

- Diff-ing Specific Files
  - git diff HEAD [filename], git diff --staged [filename], etc: We can view the changes within a specific file by providing git dif with a filename
- Comparing Branches:

  - git diff branch1..branch2 will list the changes between the tips of branch1 and branch2. Can use ".." or a space.
  - **Order matters!**

- Comparing Commits
  - git diff commithash1..commithash2: Compares two commits using the commit hashes
- Compare current HEAD to the parent: git diff HEAD..HEAD~1
- git diff HEAD~1: Compare parent commit to the child (left blank)
  - HEAD~1 is a short syntax for "the parent commit of HEAD"

## Section 9: Ins and Outs of Stashing

This section covers...

- Git Stash Basics.
- Git Stash Save.
- Git Stash Pop.
- Git Stash Apply.
- Dropping & Clearing the Stash.
- Working w/Multiple Stashes.

This is a topic that some people can live their lives without ever using! None of it is critical to know. If they use it at all, mostly use Save & Pop only.

_Scenario_: Worked on master branch. Created new branch, made some new work, and want to switch back to master without making any new commits -- what happens?

1. Your changes come with you to the destination branch, or
2. Git won't let you switch if it detects potential conflicts

There are lots of times you are working on something and not done, don't want to make an actual official commit, but you need to go somewhere else (different branch).
You want to switch over but either

1. can't due to conflicts, or
2. don't want to bring your current changes with you

**Solution! We _STASH_ these changes!**

**STASHING**

Git provides an easy way of stashing these uncommitted changes so that we can return to them later, w/o having to make unnecessary commits.

- `git stash`: Helps save changes you're not ready to commit. You can stash changes and then come back to them later.

  - Running git stash will take all uncommitted changes (staged and unstaged) and stash them, reverting the changes in your working copy.
  - You can also use `git stash save` instead. This is a shorter alias, though.

- git stash pop: Removes the most recently stashed changes in your stash and re-apply them to your working copy.
  - Can pop them onto the same branch you stashed them on, or a different branch!

**Scenario**: I'm working on a bug-fix branch. Coworker asks me to check out his latest master commit. I need to switch to that branch -- so I stash my changes.
Now that I have stashed my changes, I can switch branches, create new commits, etc. I head over to master and take a look at my coworker's changes.
When I'm done, I can re-apply the changes I stashed away at any point.

- `git stash apply`: Applies whatever is stashed away, w/o removing it from the stash.

  - This can be useful if you want to apply stashed changes to multiple branches.
  - Like git stash pop but the stashed content isn't removed afterward.

- Stashing Multiple Times: You can add multiple stashes onto the stack of stashes. They will all be stashed in the order you add them.
- Applying Specific Stashes: Git assumes you want to apply the most recent stash when you run git stash apply, but you can specify a stash:

  - git stash apply stash@{2}, git stash apply stash@{3}, etc (0 being the most recent)

- git stash list: Shows all our stashes, along with their reference index.

- Dropping Stashes:
  - `git stash drop <stash-id>`: To delete a particular stash, use this command. Ex git stash drop stash@{2}
    - Useful if you aren't removing your stash via git stash pop, and rather using git stash apply.
- `git stash clear`: Deletes the entire stash list.

## Section 10: Undoing Changes & Time Traveling

**This section covers...**

- Checking Out Commits.
- "Escaping" Detached HEAD.
- Discarding Changes w/ Checkout.
- Git Restore.
- Git Reset.
- Git Revert.

- A lot of commands covered! But they all deal with undoing changes.
- git checkout: This command is like the Git Swiss Army knife! Many devs think it's overloaded, which lead to the addition of the git switch & git restore commands.
  We can use checkout to create branches, switch to new branches, restore files, and undo history!
- git checkout <commit-hash>: Allows us to view a previous commit.
  Remember, you can use the git log command to view commit hashes. We just need the first 7 digits of the commit hash.
  Leads to "Detached HEAD state" warning.
- Normally HEAD points to a specific BRANCH reference rather than a particular commit.
  Then the BRANCH itself points to the tip of a branch -- the most recent commit on a branch.
- When we checkout an earlier commit, we're actually changing HEAD to refer to a commit, rather than a branch reference.
- Re-attaching Our Detached HEAD!:

  - Don't panic when detached HEAD happens! It's not a bad thing. You can resolve this in a couple ways:
    1. Stay in detached HEAD to examine the contents of the old commit. Poke around, view the files, etc.
    2. Leave and go back to wherever you were before -- reattach the HEAD.
    3. Create a new branch and switch to it. You can now make and save changes, since HEAD is no longer detached.

- git checkout supports a slightly odd syntax for referencing previous commits relative to a particular commit:

  - HEAD~1 refers to the commit before HEAD (Parent)
  - HEAD~2 refers to 2 commits before HEAD (Grandparent)
  - **NOTE**: Parents come chronologically later than their children. They are NOT just the top-most commit in a GUI.
  - git switch -: This takes us back to whatever HEAD we were on LAST. Useful if we git checkout to an older commit and then want to go back to where we were prior.
  - Discard Changes: Suppose you've made some changes to a file but don't want to keep them. To revert the file back to whatever it looked like when you last committed, use:
    - git checkout HEAD <file>: This discards any changes in that file, reverting back to the HEAD. Note: This is NOT undoable!

  **Scenario**: Since our last commit, we have worked a lot but realize everything we did was incorrect and pointless! We could undo all of this manually, or enter...
  git checkout HEAD <file-name> . This means take the contents of whatever <file-name> was at HEAD, rather than what the contents are currently.
  Another Option: A shorter option to revert a file... Rather than typing HEAD, you can substitute "-- <file-name>" to restore the specified file(s).
  Example: git checkout -- cat.txt dog.txt instead of doing git checkout HEAD cat.txt dog.txt

  **_Un-Modifying With Git Restore_**

  git restore is a brand new Git command that helps w/undoing operations! Because it's so new, most of the existing Git tutorials and books don't mention it -- but worth knowing!

  Recall that git checkout does a million different things, which many git users find confusing.

  So git restore was introduced alongside git switch as an alternative to some of the uses for checkout.

  **Scenario**: You've made some changes to a file since your last commit. You've saved the file but then realize you don't want those changes any more.

  - To restore the file to the contents in the HEAD, use: git restore <file-name>
  - This command is not "undoable" -- if you have uncommitted changes in the file, they will be lost!
  - Equivalent to git checkout HEAD <file-name>

  - git restore <file-name> restores using HEAD as the default source, but we can change that using the --source option.
    - For example: git restore --source HEAD~1 home.html will restore the contents of home.html to its state from the commit prior to HEAD.
    - You can also use a particular commit hash as the source.

  **Unstaging Files w/ Restore**

  If you have accidentally added a file to your staging area w/ git add and you don't wish to include it in the next commit, you can use git restore to remove it from stage! Use the --staged option like this: `git restore --staged app.html`

  Confused by restore unmodified files & also unstaging files? Fortunately git status reminds you what to use, via a message such as:

  ```
  Changes to be committed: Changes not staged for commit:
  (use "git restore --staged <file>..." to unstage) & (use "git restore <file>..." to discard changes in working directory)
  ```

**Undoing Commits With Git Reset**

Suppose you've made a couple commits on the master branch, but you actually meant to make them on a separate branch instead.
To undo those commits, you can use git reset. This command resets a repo back to some particular commit.
git reset <commit-hash> will reset the repo back to a specific commit. The commits are gone.

**IMPORTANT**: This just removes the COMMITS! The changes made during those commits are still present.
This is useful if you make some commits on the wrong branch...You want to keep that work, but move it to another branch.

**Scenario**: Made changes on wrong branch. So you: git reset <hash>. Then git switch <branch> to bring the changes with you to correct branch. Then git add . and git commit. Then switch back to the other branch -- now without those unwanted changes!

- Hard Reset!: If you want to undo both the commits AND the actual changes in your files, you can use the --hard option.
  - For example, git reset --hard HEAD~1 will delete the last commit and associated changes.
  - Only removes it from this branch. Other branches that relied on it do not have its presence removed.

**Reverting Commits With Git Revert!**

- git revert is similar to git reset in that they both "undo" changes, but they accomplish it in different ways.
- git reset actually moves the branch pointer backwards, eliminating commits.
- git revert instead creates a brand new commit which reverses/undos the changes from a commit.
  - Because it results in a new commit, you will be prompted to enter a commit message.
- git revert <commit-hash> accomplishes this!
- Our history of the bad commit is preserved, but we're able to undo the mistakes made.

**Reset and Revert: Which One Should I use?**

- Both git reset and git revert help us reverse changes, but there is a significant difference when it comes to collaboration.
  - If you want to reverse some commits that other people already have on their machines, you should use revert.
  - If you want to reverse commits that you haven't shared with others, use reset and no one will ever know! ;)
- By using revert to reverse the same commits as before, by ADDING new commit to the chain, , your team can merge in the new "undo" commit without issue. You didn't alter history!
- By using reset to remove commits that you've already shared with your team, it makes their lives harder; you've altered history that they already have!

## Section 11: Github Basics

_ This section covers...What does Github do? Cloning. Registering for Github & Setting up SSH Keys. Creating Github Repos. Working w/ Remotes. Git Push!
_ What is Github? Hosting platform for git repos. You can put your own Git repos and access them from anywhere, and share them with people!
_ Also provides additional collaboration features that are nto native to Git.
_ Why Use Github?
_ Collaboration: If you ever plan on working on a project with at least one other person, Github will make your life easier.
_ Open Source Projects: If you plan on starting/contributing to open source projects, you'll need to be comfortable with Github.
This is great for elevating yourself as a potential employee!!!
_ Exposure: Your Github profile showcases your own projects & contributions to other's projects. It can act as a sort of resume.
Additionally, you can gain some clout on the platform for creating or contributing to popular projects.
_ Stay Up To Date: Being active on Github is the best way to stay up to date with the projects and tools you rely on.
Learn about upcoming changes and the decisions/debate behind them.
_ Cloning: Instead of starting our own repo from scratch, we can get a local copy of an existing repo instead.
To do this, we CLONE a remote repo hosted on Github or similar websites. All we need is a URL that we can tell Git to clone for use.
git clone <url>: To a clone a repo, simply run this command.
Git will retrieve all the files associated w/ the repo and will copy them to your local machine.
in addition, Git initializes a new repo on your machine, giving you access to the full Git history of the cloned project.
Make sure you are not in a current repository before cloning!
_ Cloning: Do I have Permission?
_ Anyone can clone a repo from Github, provided the repo is Public. You don't need to be an owner or collaborator to clone the repo locally to your machine.
You just need the URL from Github. Pushing your own changes to the Github repo...that's another story! You need permission to do that!
Doesn't mean you can turn around and sell it, depending on the license!
_ We are not limited to Github repos. git clone is NOT tied specifically to Github.
_ Github Setup SSH Config:
_ To use Github, you have to signup/register, and then setup your SSH Keys.
_ You need to be authenticated on Github to do certain operations, like pushing up code from your local machine. Your terminal will prompt you
every single time for your Github email and password, unless...you generated and configure an SSH key! Once configured, you can connect
to Github w/o having to supply your username/password.
_ To see if you have SSH keys already, type the following in a command prompt: ls -al ~/.ssh
If nothing shows up, you need to set them up.
_ How Do I Get My Code On Github?
Option 1: If you already have an existing repo locally that you want to get on Github...
_ Create a new repo on Github
_ Connect your local repo (add a remote)
_ Push up your changes to Github
Option 2: If you haven't begun work on your local repo, you can...
_ Create a brand new repo on Github
_ Clone it down to your machine
_ Do some work locally
_ Push up your changes to Github
With this option, you don't have to manually connect your local repo to your Github repo b/c it automatically is connected to that URL if done via Github.
_ Remote: Before we can push anything up to Github, we need to tell Git about our remote repo on Github. We need to setup a "Destination" to push up to.
In Git, we refer to these "Destinations" as remotes. Each remote is simply a URL where a hosted repo lives.
_ Viewing Remotes: To view any existing remotes for your repo, we can run git remote or git remote -v (verbose, for more info)
This just displays a list of remotes. If you haven't added any remotes yet, you won't see anything.
_ Adding a new Remote:
git remote add <name> <url>: A remote is really two things: a URL and a label. "Hey Git, remember this URL using this name".
"origin" is a standard name.
Example: git remote add origin https://github/epitome87/myRepo.git: "Okay git, any time I use the name "origin", I'm referring to this particular Github repo URL.
_ Origin: Origin is a conventional Git remote name, but it is not at all special.
_ Other commands: Although not commonly used, there are commands to rename and delete remotes if needed:
_ git remote rename <old> <new>
_ git remote remove <name>
_ Pushing! : We use the git push command to push some work up to Github. We need to specify the remote we want to push up to AND
the specific local branch we want to push up to that remote.
_ git push <remote> <branch>
Usage: git push origin main: This tells git to push up the main branch to our origin remote.
_ How to do Option 2 for getting your repo on Github: Starting From scratch (haven't begun work on your local repo)
_ First, create a new empty repo on Github. Then, clone the Github repo to your local machine (git clone <url>) -- the local repo is automatically "connected" to Github.
Then do some work and make some commits locally. Then git push origin main to push changes from local main branch to Github origin remote.
** VERY IMPORTANT** CAN PRES THE 'INSERT' BUTTON ON KEYBOARD TO CTRL+C (COPY) CONTENT INTO GIT BASH  
 _ Renaming "master" (or any other) branch to "main":
git branch -M main (from whatever branch you're currently on).

## Section 12: Fetching & Pulling

_ This section covers...Remote Tracking Branches. Git Fetch. Git Pull.
_ Remote Tracking Branch: This is a reference to the state of the master branch on the remote. We can't move this ourselves.
It's like a bookmark pointing to the last known commit on the master branch on origin.
_ "At the time you last communicated w/this remote repo, here is where x branch was pointing".
_ They follow this pattern: <remote>/<branch>.
_ origin/master references the state of the master branch on the remote repo named origin.
_ upstream/logoRedesign references the state of the logoRedesign branch on the remote named upstream (a common remote name)
_ You can view these Remote Tracking Branches using the following command:
git branch -r: This lets us view the remote branches our local repo knows about.
_ To checkout the remote branch pointer (see what the project was like when you first clone/updated the remote repo), you simply do:
git checkout origin/master (i.e git checkout <remote>/<branch>)
_ Working With Remote Branches:
_ Once you've cloned a repo, you have all the data and Git history for the project at that moment in time. But that doesn't mean it's all in your workspace!
_ The Github repo has a branch called puppies, for instance, but when I run git branch I don't see it on my machine. All I see is main branch. What's going on?
_ When you clone a Github repo to your local machine, you only end up with the main branch. How do we get the others? We still see all the origin branches with git branch -r
_ By default, your main branch is already tracking origin/main. You didn't connect these yourselves. Ths is default clone behavior.
_ Scenario: You want to work on 'puppies' branch locally:
You could checkout origin/puppies, but that puts you in detached HEAD.
I want my own local branch called puppies, and I want it to be connected to origin/puppies, just like my local main branch is connected to origin/main.
_ Solution is easy with the new switch command!
_ git switch <remote-branch-name>: Creates a new local branch from the remote branch of the same name.
git switch puppies makes me a local puppies branch AND sets it up to track the remote branch origin/puppies.
We now have our own puppies branch that points to the origin/puppies remote branch. We still have our main branch pointing to origin/main, too!
Git detects there's already a remote branch called puppies, and assumes we want them connected.
_ (Old version of git switch <remote-branch-name>: git checkout --track origin/puppies)
_ Git Fetch - The Basics
_ Scenario A) Oh no! While you were creating new commits off main in your own main branch, your friend made his own and pushed them to Github, but your local repo doesn't know!
How do I get these changes?
_ Diagram of workflow with remote repos:
git add ==> git commit ==> git push ==>
Workspace Staging (index) Local Repo Remote Repo
<== git fetch  
 <========= git pull ======================
_ Two commands we can use to get changes (new commits) from a remote repository.
_ 1) Fetching: Takes remote changes (stuff coming from a Github repo) and bring them down to the local repo, NOT into our working directory.
Allows us to download changes from a remote repo, but those changes will not be automatically integrated into our working files.
It lets you see what others have been working on, w/o having to merge those changes into your local repo.
Think of it as "please go and get the latest info from Github, but don't screw up my working directory."
_ git fetch <remote>: Fetches branches and history from a specific remote repo. It only updates remote tracking branches.
git fetch origin would fetch all changes from the origin remote repo.
NOTE: If not specified, <remote> defaults to origin. So we can simply: git fetch (most the time).
_ git fetch <remote> <branch>: This lets us fetch a specific branch (rather than all) from a remote.
For example, git fetch origin main would retrieve the latest info from the master branch on the origin remote repo.
_ Scenario A) Solution!  
 We FETCH our friend's changes made to origin/main: git fetch origin main  
 Now if we want to see the changes, we can git checkout origin/main. Our own main branch remains untouched. We've downloaded the changes, but not integrated them.
_ Demonstrating Git Fetch:
_ Say you've made changes directly on Github to your repo. You've added a "tinkerbell.txt" file into your movie branch, and you commit. On your local repo, you do git status:
It's saying your branch is up to date with "origin/movies"! But what about tinkerbell?
Remember: As far as YOUR latest reference to the remote origin/branch is concerned, you are caught up. Your repo is not constantly asking Github if there's
new stuff from its remote repo. You have to tell it to go fetch the latest changes! Use: git fetch origin movies
Now that you've fetched the changes, git status will indicate that you are behind the origin/movies remote branch.
Remember: You DO NOT have the new work (tinkerbell.txt), and you cannot git log to see the corresponding tinkerbell commit. Nothing has changed in working directory.
origin/movies is simply just pointing to something new, and we can take a look at that: git checkout origin/movies (we are now in detached HEAD)
_ Pulling!:
_ 2) Pulling: The second way to get changes (new commits) from a remote repository.
git pull: This is another command we can use to retrieve changes from a remote repo. Unlike fetch, pull actually updates our HEAD branch with whatever changes
are retrieved from the remote. It's like saying: "Go and download data from Github AND immediately update my local repo with those changes."
_ You can think of it as: git pull = git fetch + git merge
I.e, git pull = (update the remote tracking branch w/the latest changes from the remote repo) + (update my current branch w/ w/e changes are on remote tracking branch)
_ git pull <remote> <branch>
_ To pull, we specify a particular remote and branch we want to pull. Just like with git merge, it matters WHERE we run this command from.
Whatever branch we run it from is where the changes will be merged into.
git pull origin master would fetch the latest info from the origin's master branch & merge those changes into our CURRENT branch.  
 _ Like local merges, Pulls can result in merge conflicts!
_ Using the above example, to get the tinkerbell changes: (While in our movies branch) run: git pull origin movies
Now our local movies branch & origin/movies point to the same commit.
_ Git Pull & Merge Conflicts :( :
_ GOOD PRACTICE: Before you ever PUSH something up to Github, you want to PULL down
_ A Shorter Syntax For Git Pull:
_ git pull <remote> <branch>...since "origin" is such a common <remote> name, it defaults to "origin" if you don't specify it.
_ If we run git pull w/o specifying a particular remote or branch to pull from, git assumes the following:
_ Remote branch will default to origin
_ Branch will default to w/e tracking connection is configured for your current branch (these were set for us by git switch <branch>)
_ Until we have more than one remote, we can simply use: git pull
_ Fetch vs. Pull - Summary:
git fetch: git pull:  
 _ Gets changes from remote branch(es) _ Gets changes from remote branch(es)
_ Updates the remote-tracking branches w/ the new changes _ Updates the current branch w/the new changes, merging them in
_ Does NOT merge changes onto your current HEAD branch _ Can result in merge conflicts
_ Safe to do at any time \* Not recommended if you have uncommitted changes!

## Section 13: Github Grab Bag - Odds & Ends

_ This section covers...Repo Visibility: Public vs. Private. Adding Github Collaborators. README files. Writing Markdown. Github Gists. Github Pages
_ Public Vs. Private Repos:
_ Public Repos are accessible to everyone on the internet. Anyone can see the repo on Github. They are accessible/discoverable/cloneable by anyone.
_ Doesn't mean they can change (push) to the repo -- must have collaborate permissions.
_ Private Repos are only accessible to the owner & people who have been granted access.
_ Can change between private and public (if owner) under Github - Settings - Options - "Danger Zone" - Change Repo Visibility.
_ Kind of a hassle going from Public to Private -- but it is easily do-able.
_ Adding Collaborators:
_ Working w/ somebody on a Github repo is different from just making a Repo public.
_ You must grant people Collaboration Privileges in order to allow them to push to your Repo.
_ Go to Settings -> Manage Access -> then Invite a collaborator. Must know their email or Github username.
_ Add them to the repository!
_ Now, that person must go to their email and click the link on the given invite. They see an Accept/Decline page on Github.
_ They can now see your Private repo, and collaborate on it!
_ But they do not have access to the "Settings" -- they are not the owner -- YOU are!
_ Github Collaboration Demo: (Not really any notes on this)
_ What are READMEs?:
_ A README file is used to communicate important info about a repo, including: - What the project does. - How to run the project. - Why it's noteworthy. - Who maintains the project.
_ If you put a README in the root of your project, Github will recognize it & automatically display it on the repo's home page.
_ Probably the one thing a non-technical person would look at if they're looking at your projects!
_ README.md
_ Should go in the root directory.
_ In VS Code, we can preview markdown files via the Command Pallette and type "Markdown: Open Preview"
_ READMEs are Markdown files, ending with the .md extension. Markdown is a convenient syntax to generate formatted text. It generates markup.
_ A Markdown Crash Course:
_ Markdown is a text-to-HTML conversion tool for web writers.
_ Github turns it into HTML for us.
_ Headings: Done with the "#" sign, followed by a space.
_ Do "#" for an h1 header. ## for an h2, ### for an h3, etc, until ###### for h6.
_ Horizontal Rules: These are horizontal lines going across. \* Three different ways: 1) "**\_" 2) "---" and 3) "**_"
_ Typographic Replacements (Symbols):
_ "(c)" or "(C)" for copyright symbol. "(tm)" or "(TM)" for trademark symbol. "+-" for plus/minus symbol
_ Emphasis (Bold): \* Multiple ways to do bold text. 1) Enclose text in "**" 2) Enclose text in "**"
_ Italic:
_ 1) Enclose text in "_" 2) Enclose text in "\_"
_ Strikethrough:
_ Enclose text in "~~"
_ Blockquotes:
_ These start with a ">" sign. They can be nested a second level with ">>", and then ">>>", etc.
_ You can have spaces between the arrow signs, too.
_ Note: Must have an actual empty line between lines of text to break out from the Blockquotes (or other Markdown).
_ Lists - Unordered:
_ Create a list by starting a line with "+" or "-" or "_"
_ Sub-lists are made by indenting 2 spaces. Marker character change forces new list start: I.e, going from _ to + starts a new list.
Example: + Top level bullet point + Same level, second bullet point - Second-level bullet point, using a new type of bullet.
_ Another marker change, so a third bullet point icon is used.
_ Same marker as the above one, and at the same level. + Back out to the top level!
NOTE: Can technically use the same marker _ or + or - the whole way through.
_ Lists - Ordered:
_ Can be done by simply doing numbers, like "1.", "2."
_ You can use sequential numbers, or just put "1." the whole time -- it'll order them for you!
_ You can start the numbering with an offset:
"57. Starting at 57!"
"1." This one will be 58 now!"
_ Code Blocks!!! :
_ Inline code:
_ Enclose in "` " _ This surrounds the word / phrase / line in a small block. _ Indented code: _ Simply tab before typing what you wish. Example: " Starting text here." " More typing. Note the tab before me!" " Even more. We're all enclosed in a block now!" _ Block Code "Fences": _ Put "```" above and below the lines you are wishing to wrap into a code fence. _ Syntax Highlighting!: _ You can specify the language, like "js" after the "```" (and then a space), and you'll have syntax highlighting. _ Example:  `js console.log("Hello World"!)`
_ Tables:
_ Pretty tedious; probably just Google when you need to use.
| Left columns | Right columns |
| ------------- |:-------------:|
| left foo | right foo |
| left bar | right bar |
| left baz | right baz |
_ Links:
_ You can do links by enclosing the link text in brackets "[link text]" followed IMMEDIATELY by the URL in parenthesis "(URL)"
Example: [Click Me!](https://google.com);
_ Images:
_ Same as Links, but you add "!" in front.
Example: ![Minion](https://octodex.github.com/images/minion.png)
_ Emojis:
_ Superscript: ^
_ Subscript: ~
_ <ins> Inserted text
_ <mark> Marked text
_ Footnotes: "[^first]" "[^second]"
_ Inline version: Inline footnote"^[Text of inline footnote]" definition.
_ Definition Lists: ":"
_ Abbreviations: Example:
"This is HTML abbreviation example.
_[HTML]: Hyper Text Markup Language"
_ Github Gists:
_ Gists are a simple way to share code snippers and useful fragments w/others.
_ Gists are much easier to create, but offer far fewer features than a typical Github repo. Forking is still available.
_ You can see your Gists under your profile.
_ Useful for quickly sharing simple code or instructions.
_ People can commit, discuss, etc.
_ Can create "Secret" or "Public" Gists.
_ There's a "Discovery" feature that presents popular Gists to you.
_ You can see revisions and diffs (they're repos in the background).
_ Github Pages!!!:
_ Public webpages that are hosted and published via Github. They allow you to create a website simply pushing your code to Github.
_ Can only do client-side static webpages. Does nto support server-side code like Python, Ruby, or Node. Just HTML/CSS/JS
_ github.io is the domain they have by default.
_ 1) User Site:
_ You get one user site per Github account. This is where you could host a portfolio site or some form of personal website.
The default URL is based on your Github username, following this pattern: username.github.io -- though you can change this.
_ 2) Project Sites:
_ You get unlimited project sites! Each Github repo can have a corresponding hosted website.
It's as simple as telling Github which specific branch contains the web content. The default URLs follow this pattern:
username.github.io/repo-name
_ Github Pages Demo (not much notes on this):
_ Can have your index.html (must be this name) file in your actual main branch. Or you can create a branch that will solely serve as the Git Page.
_ Typically, this branch should be called gh-pages (though not necessary), as Github will detect it automatically. \* Github will ask you to select the folder in which they'll find the index.html -- typically / (root)

## Section 14: Git Collaboration Workflows

**This section covers...**

- Problems With Working On A Single Branch.
- Feature Branch Workflow.
- Pull Requests.
- Branch Protection Rules.
- Forking.
- Fork-And-Clone Workflow.

- (Workflow 1 - Bad) Pitfalls Of A Centralized Workflow:
- Centralized Workflow - Demonstration:
- (Workflow 2 - Good) Feature Branch Workflow!:
- Feature Branch Workflow - Demonstrating:
- Merging Feature Branches:
- Making Our First Pull Request:
- Merging Pull Requests That Have Conflicts
- Configuring Branch Protection Rules
- (Workflow 3 - Good For Open Source [Fork & Clone]) Introducing Forking:
- Forking - Demonstration
- The Fork & Clone Workflow
  1. For the project.
  2. Clone the fork.
  3. Add upstream remote.
  4. Do some work.
  5. Push to origin.
  6. Open Pull Request to original (upstream)
- Fork & Clone Workflow - Demonstration

## Section 15: Rebasing - The Scariest Git Command

**This section covers...**

- Rebasing Vs. Merging.
- Git Rebase Basics.
- When NOT to Rebase.

## Section 16: Cleaning Up History w/ Interactive Rebase

**This section covers...**

- Rewording Commits.
- Fixing Up/Squashing Commits.
- Dropping Commits.

## Section 17: Git Tags - Marking Important Moments in History

**This section covers...**

- Understanding Git Tags.
- Semantic Versioning.
- Viewing Tags. Diffing Tags.
- Lightweight vs Annotated Tags.
- Moving Tags.
- Deleting Tags.
- Pushing Tags.

## Section 18: Git Behind the Scenes - Hashing & Objects

(Not Important!)

**This section covers...**

- The Local Config File.
- The Refs Directory.
- The HEAD File.
- Hashing Functions Basics.
- Git Objects: Blobs, Trees, and More!

## Section 19: The Power of Reflogs - Retrieving Lost Work

**This section covers...**

- Exploring Reflog Files.
- The Git Reflog Command.
- Rescuing Lost Commits With Reflog.
- Undoing Rebases With Reflog.
- Time-Based Reflog Qualifiers.

Section 20: Writing Custom Git Aliases

This section covers...

- The Global Config File.
- Writing Basic Aliases.
