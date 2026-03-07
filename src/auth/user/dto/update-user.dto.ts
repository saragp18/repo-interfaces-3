import { PartialType } from '@nestjs/mapped-types';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateUserDto } from './create-user.dto';

import { User } from '@/auth/entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
