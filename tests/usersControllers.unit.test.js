import httpMocks from 'node-mocks-http';
import { describe, it, expect, afterAll } from '@jest/globals';
import {mockUserObject} from "./mocks/users";

jest.mock('../services/usersServices');

import usersServices from '../services/usersServices';
import * as usersControllers from '../controllers/usersControllers';

const mockLoginUser = jest.spyOn(usersServices, 'loginUser');
describe('usersController - unit tests', () => {
    it('loginUser test', async () => {
        // mock
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();

        const mockUserObj = jest.fn(async () => {
            return mockUserObject;
        });

        mockLoginUser.mockImplementation(mockUserObj);
        await usersControllers.login(request, response);

        expect(mockLoginUser).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().token).toBeTruthy();
        expect(response._getJSONData().user.email).toBe("example2@example.com");
        expect(response._getJSONData().user.subscription).toBe("starter");
    });
});

afterAll(() => {
    jest.clearAllMocks();
});