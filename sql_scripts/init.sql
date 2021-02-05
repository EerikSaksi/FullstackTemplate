drop schema public cascade;
create schema public;


create table "session" (
  session_id integer not null primary key
);

create table "user" (
  username varchar not null primary key ,
  session_id integer references "session" on delete set null
);
create index on "user"(session_id);

