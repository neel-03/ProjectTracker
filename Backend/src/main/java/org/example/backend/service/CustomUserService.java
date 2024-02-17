package org.example.backend.service;

import org.example.backend.CustomUserDetails;
import org.example.backend.DTO.UserRegisterDTO;
import org.example.backend.Entities.Role;
import org.example.backend.Entities.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(mail);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new CustomUserDetails(user);
    }

    public User save(UserRegisterDTO dto) {
        Role role = new Role();

        if (dto.getRole().equals("ADMIN")) {
            role = roleRepository.findByRole("ADMIN");
        } else if (dto.getRole().equals("MENTOR")) {
            role = roleRepository.findByRole("MENTOR");
        }

        User user = new User();
        user.setName(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRoles(role);

        return userRepository.save(user);
    }
}
