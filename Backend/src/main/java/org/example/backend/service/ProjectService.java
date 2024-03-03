package org.example.backend.service;

import org.example.backend.Entities.Project;
import org.example.backend.Entities.User;
import org.example.backend.repository.ProjectRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    public Project saveOrUpdate(Project project) {

        if (project.getStatus() == null || project.getStatus().isEmpty()) {
            project.setStatus("IN PROGRESS");
        }

        return projectRepository.save(project);

    }

    public Iterable<Project> findAll() {
        return projectRepository.findAll();
    }

    public Project findById(long id){
        return projectRepository.findById(id);
    }

    public void delete(long id){
        Project project = findById(id);
        projectRepository.delete(project);
    }
}
