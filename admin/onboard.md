### Team 12: Onboarding


The following is a complete overview of our GitHub repository:

```
.
├── README.md
├── admin
│   ├── 8-ball
│   ├── branding
│   ├── cipipeline
│   ├── meetings
│   ├── misc
│   ├── onboard.md
│   ├── team.md
│   └── videos
├── source
│   ├── README.md
│   ├── __tests__
│   ├── audio
│   ├── babel.config.js
│   ├── config
│   ├── css
│   ├── display.html
│   ├── doc
│   ├── img
│   ├── index.html
│   ├── js
│   ├── jsdoc.json
│   ├── netlify
│   ├── package-lock.json
│   └── package.json
└── specs
    ├── adr
    ├── brainstorm
    ├── interface
    ├── pitch
    ├── roadmap1.md
    └── users
```

Here, you can find three main files:

##### [Admin](/admin)
- Contains files having to do with team administration; files such as meeting
  notes, videos, pipeline information can all be found here.
##### [Source](/source)
- This folder contains our code; testing, documentation, javascript, css, and
  html are all here.
##### [Specs](/specs)
- Contains files having to do with our project design can be found here; user
  stories, design choices, brainstorms, and our pitch can all be found here.

Hidden under [.github/workflows](.github/workflows), we have our CI/CD pipeline:

```
.
└── workflows
    ├── csslint.yml
    ├── jsdoc.yml
    ├── jslint.yml
    ├── page.yml
    └── unittest.yml
```

This is where you can find our current rules implemented into the workflow. This
includes:
- Linters
- Documentation Generation
- Deployment to GitHub pages
- Unit testing

For more information regarding our CI/CD pipeline please see
[admin/cipipeline/phase1.md](admin/cipipeline/phase1.md).

#### CI/CD Pipeline Diagram Process:

![Diagram](https://raw.githubusercontent.com/cse110-sp23-group12/cse110-sp23-group12/main/admin/cipipeline/phase1.png?token=GHSAT0AAAAAAB6WFL4VR23NU36I4DFV77FUZDKXWWQ)

#### Example Workflow:

Suppose 
