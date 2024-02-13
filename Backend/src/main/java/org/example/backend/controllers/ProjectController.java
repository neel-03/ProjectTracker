package org.example.backend.controllers;

import jakarta.validation.Valid;
import org.example.backend.Entities.Project;
import org.example.backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<?> addProject(@Valid @RequestBody Project project,
                                        BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();

            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        Project newProject = projectService.saveOrUpdate(project);
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public Iterable<Project> getAllProjects() {
        return projectService.findAll();
    }

    @RequestMapping(value = "/{projectId}", method = RequestMethod.GET)
    public ResponseEntity<?> getProjectById(@PathVariable("projectId") long id) {
        Project project = projectService.findById(id);

        if(project == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @RequestMapping(value = "/{projectId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProject(@PathVariable("projectId") long id){
        projectService.delete(id);
        return new ResponseEntity<>("Project deleted", HttpStatus.OK);
    }
}
