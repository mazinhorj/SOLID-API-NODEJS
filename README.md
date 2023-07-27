# SOLID-API-NODEJS

## APP

  * GymPass Style App

## RFs (Requisitos Funcionais)
  - [x] Must be able to sign up;
  - [ ] Must be able to authenticate;
  - [ ] Must be able to get an authenticated user profile;
  - [ ] Must be able to get how much check-ins from an authenticated user;
  - [ ] Must be able to get its own check-ins history;
  - [ ] Must be able to get gymns nearby;
  - [ ] Must be able to get gymns by name;
  - [ ] Must be able to check into a gym;
  - [ ] Must be able to validate a user's check-in;
  - [ ] Must be able to register a gym;



## RNs (Regras de Negócio)
  - [x] Must not register with a duplicate e-mail;
  - [ ] Must not check-in twice on the same day;
  - [ ] Must not check-in if not at least 50m from the chosen gym;
  - [ ] Must validate a check-in within 20 minutes of its creation;
  - [ ] Only admins can validate a check-in;
  - [ ] Only admins can register a gym;


## RNFs (Requisitos não Funcionais)
  - [x] Passwords must be encrypted;
  - [x] App data must persist in a PostgerSQL DB;
  - [ ] All data lists must be paginated with 20 items per page;
  - [ ] Users must be identified by JWT;




