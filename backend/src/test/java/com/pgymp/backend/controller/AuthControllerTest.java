package com.pgymp.backend.controller;

import tools.jackson.databind.ObjectMapper;
import com.pgymp.backend.SecurityConfig;
import com.pgymp.backend.dto.LoginRequest;
import com.pgymp.backend.dto.LoginResponse;
import com.pgymp.backend.dto.RegisterRequest;
import com.pgymp.backend.service.CapacityService;
import com.pgymp.backend.service.EquipmentService;
import com.pgymp.backend.service.HeatmapService;
import com.pgymp.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@Import(SecurityConfig.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private CapacityService capacityService;

    @MockitoBean
    private EquipmentService equipmentService;

    @MockitoBean
    private HeatmapService heatmapService;

    @Test
    void login_returnsSuccessResponse_whenCredentialsValid() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setMatricId("A0123456X");
        request.setPassword("password123");

        LoginResponse mockResponse = new LoginResponse(true, "Login successful", 1L, "fake-token");
        when(userService.login(anyString(), anyString())).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.token").value("fake-token"));
    }

    @Test
    void login_returnsFailureResponse_whenCredentialsInvalid() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setMatricId("A0123456X");
        request.setPassword("wrongpassword");

        LoginResponse mockResponse = new LoginResponse(false, "Invalid credentials", null, null);
        when(userService.login(anyString(), anyString())).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Invalid credentials"));
    }

    @Test
    void register_returnsSuccessResponse_whenNewUser() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setMatricId("A0987654Y");
        request.setPassword("newpassword");

        LoginResponse mockResponse = new LoginResponse(true, "Registration successful", 2L, "new-token");
        when(userService.register(anyString(), anyString())).thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.id").value(2));
    }

    @Test
    void getCapacity_returnsCurrentCount() throws Exception {
        when(capacityService.getCurrentCount()).thenReturn(12L);

        mockMvc.perform(get("/api/auth/capacity"))
                .andExpect(status().isOk())
                .andExpect(content().string("12"));
    }
}