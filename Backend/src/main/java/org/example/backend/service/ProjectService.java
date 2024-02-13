package org.example.backend.service;

import org.example.backend.Entities.Project;
import org.example.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdate(Project project) {

        if (project.getStatus() == null || project.getStatus().isEmpty()) {
            project.setStatus("TO_DO");
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
