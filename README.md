<h3 align="center">
  DDL (sql) to Go Struct
</h3>

This is a simple tool to convert the DDL instructions to a struct in Goland using the SQL package.

<p align="center">
  <a href="https://farsoft.com.br">
    <img alt="To use in my projects" src="https://img.shields.io/badge/made%20by-Farsoft%20Systems-purple%2306b656?style=flat-square">
  </a>

  <a href="https://www.github.com/farnetani/">
    <img alt="Copyright Arlei F. Farnetani Junior" src="https://img.shields.io/badge/solved%20by-Arlei%20F.%20Farnetani%20Junior-%2306b656?style=flat-square">
  </a>
</p>

The steps is simple.

First select the ddl create table instructions, example:
```sql
CREATE TABLE IF NOT EXISTS apps
(
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    app_nome varchar(255) NOT NULL UNIQUE,
    app_icone varchar(255),
    app_ativa boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    deleted_at timestamp with time zone,    
    CONSTRAINT apps_pkey PRIMARY KEY (id)
);
```

Then type `CTRL+SHIFT+p`

And run the `DDLTOGS: Convert the DDL (SQL) instructions to Go Struct` to convert the sql text selected to go struct

Or just select it and press `CTRL+SHIFT+i`

Will result in:

```go
// apps --
	ID	uuid.UUID	`db:"id"`
	APPNome	string	`db:"app_nome"`
	APPIcone	string	`db:"app_icone"`
	APPAtiva	bool	`db:"app_ativa"`
	CreatedAT	*time.Time	`db:"created_at"`
	UpdatedAT	*time.Time	`db:"updated_at"`
	DeletedAT	*time.Time	`db:"deleted_at"`
```

## Edition of Code

```
npm install -g vsce

cd /extension
vsce package

- The file will be generated: ddl-to-go-struct-0.0.3.vsix

- Right click on the file and install the vsix extension
```

## Publish

```
vsce publish -p <token>

or access link direct and click in + New extension

https://marketplace.visualstudio.com/manage/publishers/farnetani
```

## Creating a new extension

```
npm install -g yo generator-code

yo code
```

## License

This project is a copy of the extension: DDLG2GS [https://github.com/Wandecilenio/DDL2GS](https://github.com/Wandecilenio/DDL2GS) with customizations made by me to accept varchar and uuid fields for the my private use. I'm not responsible for any bugs/problems.

The refactoring of the project is under the MIT license. See the [LICENSE](/LICENSE.md) file for more details. Please, in case of copying, do not forget to cite the source above that originated all (DDLG2GS).

Customized and Refactored with :heart: by [Arlei F. Farnetani Junior](https://github.com/farnetani)

[![Github Badge](https://img.shields.io/github/followers/farnetani?style=social)](https://img.shields.io/github/followers/farnetani?style=social)
[![Instagram Badge](https://img.shields.io/badge/-farnetanijr-purple?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/farnetanijr/)](https://www.instagram.com/farnetanijr)
[![Facebook Badge](https://img.shields.io/badge/-farnetanijr-navy?style=flat-square&logo=Facebook&logoColor=white&link=https://www.facebook.com/farnetanijr/)](https://www.facebook.com/farnetanijr)
[![Gmail Badge](https://img.shields.io/badge/-farnetani@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:farnetani@gmail.com)](mailto:farnetani@gmail.com)
[![Linkedin Badge](https://img.shields.io/badge/-Arlei%20F.%20Farnetani%20Junior-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/farnetani/)](https://www.linkedin.com/in/farnetani/)
