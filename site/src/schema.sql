CREATE DATABASE market_cubos;

drop table if exists usuarios;

CREATE TABLE usuarios(
  id serial primary key,
  nome text NOT NULL,
  nome_loja text NOT NULL,
  email text NOT NULL unique, 
  senha text NOT NULL
);

drop table if exists produtos;

create table produtos(
  id serial primary key,
  usuario_id integer not null,
  nome text not null,
  quantidade integer not null,
  categoria text not null,
  preco integer not null,
  descricao text not null,
  imagem text,
  foreign key (usuario_id) references usuarios(id)
);

